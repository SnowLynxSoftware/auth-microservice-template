import { BaseRouter } from "./base.router";
import { IRoutable } from "./routable.interface";
import { NextFunction, Request, Response } from "express";
import { UserRegisterDTO } from "../models/dtos/user-register.dto";
import { AuthManager } from "../managers/auth.manager";
import { UserVerifyDTO } from "../models/dtos/user-verify.dto";
import { AuthUtil } from "../util/auth.util";
import { UserRefreshRequestDTO } from "../models/dtos/user-refresh-request.dto";
import { UserPasswordResetRequestDTO } from "../models/dtos/user-password-reset-request.dto";
import { UserPasswordResetVerifyRequestDTO } from "../models/dtos/user-password-reset-verify-request.dto";

/**
 * Contains all of the app auth routes.
 */
export class AuthRouter extends BaseRouter implements IRoutable {
  /**
   * Constructor
   * @param prefix The prefix that we want applied to this router.
   */
  constructor(prefix: string) {
    super(prefix);
    this.buildRoutes();
  }

  /**
   * Register a new user account in the system.
   * @private
   */
  private static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const registerDetails = new UserRegisterDTO(req.body);
      if (!registerDetails.email || !registerDetails.password) {
        throw new Error(
          "Email/Password are required when creating a new user!"
        );
      }
      const registerResponse = await AuthManager.registerNewUser(
        registerDetails
      );
      res.status(201).json(registerResponse);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Verify a user account in the system.
   * @private
   */
  private static async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const verifyDetails = new UserVerifyDTO(req.body);
      if (!verifyDetails.id || !verifyDetails.verificationToken) {
        throw new Error(
          "ID & VerificationToken are required when verifying an account."
        );
      }
      await AuthManager.verifyNewUser(verifyDetails);
      res.json({
        status: "ok",
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Basic email/password login.
   * @private
   */
  private static async loginBasic(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.header("Authorization")) {
        throw new Error("Your login request was invalid!");
      }
      const loginDetails = AuthUtil.getUserLoginBasicDTOFromAuthHeader(
        req.header("Authorization") as string
      );
      const loginResponseTokens = await AuthManager.loginBasic(loginDetails);
      res.json(loginResponseTokens);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Use a valid refresh token to generate a new access token.
   * @private
   */
  private static async refreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const refreshDetails = new UserRefreshRequestDTO(req.body);
      if (!refreshDetails?.refreshToken) {
        throw new Error(
          "The refresh token request was invalid. Please log in again!"
        );
      }
      const accessToken = await AuthManager.refreshAccessToken(
        refreshDetails.refreshToken
      );
      res.json({ accessToken });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Sends a password reset request--which will generate a token that the user needs to verify before allowing a password change.
   * @private
   */
  private static async resetPasswordRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const resetRequestDetails = new UserPasswordResetRequestDTO(req.body);
      const response = await AuthManager.requestUserPasswordReset(
        resetRequestDetails
      );
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Verifies the user's reset token and then changes their password in the system if its valid.
   * @private
   */
  private static async resetPasswordVerify(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const passwordResetDetails = new UserPasswordResetVerifyRequestDTO(
        req.body
      );
      if (
        !passwordResetDetails.password ||
        !passwordResetDetails.verificationToken ||
        !passwordResetDetails.email ||
        !passwordResetDetails.id
      ) {
        throw new Error(
          "The password reset verification failed. Please try again or contact support if you continue to get this error!"
        );
      }
      await AuthManager.verifyUserPasswordReset(passwordResetDetails);
      res.json({
        status: "ok",
      });
    } catch (error) {
      next(error);
    }
  }

  protected buildRoutes(): void {
    // POST
    this._router.post("/register", AuthRouter.register.bind(this));
    this._router.post("/login/basic", AuthRouter.loginBasic.bind(this));
    this._router.post("/token/refresh", AuthRouter.refreshToken.bind(this));
    this._router.post(
      "/password/reset-request",
      AuthRouter.resetPasswordRequest.bind(this)
    );

    // PUT
    this._router.put("/verify", AuthRouter.verify.bind(this));
    this._router.put(
      "/password/reset-verify",
      AuthRouter.resetPasswordVerify.bind(this)
    );
  }
}
