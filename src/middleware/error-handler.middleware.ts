import { IAuthServiceRequest } from "../models/interfaces/auth-service-request.interface";
import { NextFunction, Response } from "express";
import { UnauthorizedError } from "../errors/unauthorized.error";

/**
 * Handles all error handling in the application.
 * This ensures that we return uniform errors and status code with each error.
 */
export class ErrorHandlerMiddleware {
  public static handleErrors(
    err: any,
    _req: IAuthServiceRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      let statusCode = 500;
      let description = "An error occurred in the server!";
      let details = err.message;
      let stack = err.stack;
      let code = 0;
      switch (typeof err) {
        case typeof UnauthorizedError:
          description =
            "You are not authenticated with the system! Please login!";
          statusCode = (err as UnauthorizedError).statusCode;
          details = (err as UnauthorizedError).message;
          stack = (err as UnauthorizedError).stack;
          code = (err as UnauthorizedError).errorCode;
          break;
        default:
          break;
      }
      res.status(statusCode).json({
        description,
        details,
        ...(process.env.NODE_ENV === "development" && { stack }),
        code,
      });
    } catch (error) {
      next(error);
    }
  }
}
