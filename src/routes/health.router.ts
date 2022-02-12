import { BaseRouter } from "./base.router";
import { IRoutable } from "./routable.interface";
import { NextFunction, Request, Response } from "express";

/**
 * Contains a simple health check route.
 */
export class HealthRouter extends BaseRouter implements IRoutable {
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
  private static async healthCheck(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      res.json({
        status: "ok",
      });
    } catch (error) {
      next(error);
    }
  }

  protected buildRoutes(): void {
    // GET
    this._router.get("/", HealthRouter.healthCheck.bind(this));
  }
}
