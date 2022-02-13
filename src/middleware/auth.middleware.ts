import { IAuthServiceRequest } from "../models/interfaces/auth-service-request.interface";
import { NextFunction, Response } from "express";
import { AuthUtil } from "../util/auth.util";
import { TokenUtil } from "../util/token.util";
import { UserService } from "../service/user.service";
import { UnauthorizedError } from "../errors/unauthorized.error";

export class AuthMiddleware {
  /**
   * Used to validate the user's Bearer access token for authorized requests.
   */
  public static async validateAccessToken(
    req: IAuthServiceRequest,
    _res: Response,
    next: NextFunction
  ) {
    try {
      if (req.header("Authorization")) {
        const accessToken = AuthUtil.getAccessTokenFromAuthHeader(
          req.header("Authorization") as string
        );
        const userId = TokenUtil.validateUserAccessToken(accessToken);
        if (userId) {
          // For these functions--since this is the main auth service--we want to verify the user on every authorized call.
          // For other services--we will just validate the token and let it pass through.
          const user = await UserService.getUserByID(userId);
          if (user) {
            AuthUtil.validateUserStatusBeforeIssuingToken(user);
            req.userId = user.id;
            req.isSuperAdminUser = user.isSuperAdminUser;
            next();
          } else {
            throw new UnauthorizedError(
              "A user with the specified ID could not be found when authorizing your token!"
            );
          }
        } else {
          throw new UnauthorizedError(
            "The access token could not be verified!"
          );
        }
      } else {
        throw new UnauthorizedError(
          "An access token was not found in your request!"
        );
      }
    } catch (error: any) {
      next(error);
    }
  }

  /**
   * Used to validate that the current user is a super admin user.
   */
  public static async requiresSuperAdminUser(
    req: IAuthServiceRequest,
    _res: Response,
    next: NextFunction
  ) {
    try {
      if (req.isSuperAdminUser) {
        next();
      } else {
        next(
          new UnauthorizedError(
            "You do not have permission to access this resource!"
          )
        );
      }
    } catch (error: any) {
      next(error);
    }
  }
}
