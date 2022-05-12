import express from "express";
import helmet from "helmet";
import { AppRouterFactory } from "./routes";
import { AppDatabase } from "./database/database";
import { ErrorHandlerMiddleware } from "./middleware/error-handler.middleware";

/**
 * The AppServer ties everything together that the application will use.
 */
export class AppServer {
  /**
   * Starts the actual web server and begins listening for requests.
   */
  public static async start(): Promise<string> {
    // Create the express app instance.
    const app = express();

    // We use helmet for security
    app.use(helmet());

    // Allow JSON Encoding
    app.use(express.json());

    // Setup Database Connection
    await AppDatabase.initializeDatabaseConnection();

    // Setup Routes
    app.use(AppRouterFactory.initializeRoutes());

    // Setup Error Handling
    // @ts-ignore
    app.use(ErrorHandlerMiddleware.handleErrors);

    // Start listening...
    let { APP_PORT } = process.env;
    if (!APP_PORT) {
      console.log(
        "[APP_PORT] was not set in your environment, defaulting to 9110."
      );
      APP_PORT = "9001";
    }
    app.listen(parseInt(APP_PORT));
    return APP_PORT;
  }
}
