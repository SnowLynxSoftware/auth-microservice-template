import { BaseRouter } from "./base.router";
import { IRoutable } from "./routable.interface";
import { NextFunction, Response } from "express";
import { BanRequestDTO } from "../models/dtos/ban-request-details.dto";
import { AdminManager } from "../managers/admin.manager";
import { IAuthServiceRequest } from "../models/interfaces/auth-service-request.interface";
import { AuthMiddleware } from "../middleware/auth.middleware";

/**
 * Contains all of the app admin routes.
 */
export class AdminRouter extends BaseRouter implements IRoutable {
  /**
   * Constructor
   * @param prefix The prefix that we want applied to this router.
   */
  constructor(prefix: string) {
    super(prefix);
    this.buildRoutes();
  }

  /**
   * Ban a user account in the system.
   * @private
   */
  private static async banUser(
    req: IAuthServiceRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.params.id;
      const banRequestDetails = new BanRequestDTO(req.body);
      if (
        userId &&
        userId === banRequestDetails.id &&
        banRequestDetails.reason
      ) {
        const bannedUser = await AdminManager.banUser(
          banRequestDetails,
          req.userId
        );
        res.json({
          id: bannedUser.id,
          email: bannedUser.email,
          isBanned: bannedUser.isBanned,
          banReason: bannedUser.banReason,
          archivedAt: bannedUser.archivedAt,
        });
      } else {
        throw new Error("Your ban request was invalid!");
      }
    } catch (error) {
      next(error);
    }
  }

  /**
   * Unban a user account in the system.
   * @private
   */
  private static async unbanUser(
    req: IAuthServiceRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.params.id;
      if (userId) {
        const unbannedUser = await AdminManager.unBanUser(userId, req.userId);
        res.json({
          id: unbannedUser.id,
          email: unbannedUser.email,
          isBanned: unbannedUser.isBanned,
          banReason: unbannedUser.banReason,
          archivedAt: unbannedUser.archivedAt,
        });
      } else {
        throw new Error("Your unban request was invalid!");
      }
    } catch (error) {
      next(error);
    }
  }

  protected buildRoutes(): void {
    // PUT
    this._router.put(
      "/ban/:id",
      // @ts-ignore
      AuthMiddleware.validateAccessToken,
      AuthMiddleware.requiresSuperAdminUser,
      AdminRouter.banUser.bind(this)
    );
    this._router.put(
      "/unban/:id",
      // @ts-ignore
      AuthMiddleware.validateAccessToken,
      AuthMiddleware.requiresSuperAdminUser,
      AdminRouter.unbanUser.bind(this)
    );
  }
}
