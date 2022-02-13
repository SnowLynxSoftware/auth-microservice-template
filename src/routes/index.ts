import { Router } from "express";
import { AuthRouter } from "./auth.router";
import { IRoutable } from "./routable.interface";
import { HealthRouter } from "./health.router";
import { AdminRouter } from "./admin.router";

/**
 * Handles build all of our routes and combining each
 * individual router into a single router.
 */
export class AppRouterFactory {
  public static initializeRoutes(): Router {
    // Initialize a fresh router to bind all the other routers to.
    const appRouter = Router();

    // Initialize all the routers and setup the prefix.
    const routers: IRoutable[] = [
      new HealthRouter("/health"),
      new AuthRouter("/auth"),
      new AdminRouter("/admin"),
    ];

    for (const router of routers) {
      appRouter.use(router.prefix, router.router);
    }

    return appRouter;
  }
}
