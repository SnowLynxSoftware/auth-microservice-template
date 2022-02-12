import { Router } from "express";

/**
 * Common properties that all routers should have.
 */
export abstract class BaseRouter {
  /**
   * A protected router instance that the parent class will build to return to the main router.
   * @protected
   */
  protected _router: Router;

  /**
   * This is the prefix of this router.
   */
  protected _prefix: string;

  protected constructor(prefix: string) {
    this._router = Router();
    this._prefix = prefix;
    if (process.env.NODE_ENV && process.env.NODE_ENV === "development") {
      console.info(` |> Registering Router [${prefix}]`);
    }
  }

  /**
   * A public getter to return the instance of the router.
   */
  public get router(): Router {
    return this._router;
  }

  /**
   * A public getter to return the prefix of the router.
   */
  public get prefix(): string {
    return this._prefix;
  }

  /**
   * The parent class will use this to build the routes.
   * The parent class should override this method.
   * @protected
   */
  protected abstract buildRoutes(): void;
}
