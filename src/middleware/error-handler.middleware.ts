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
      let errDescription = "An error occurred in the server!";
      let errDetails = err.message;
      let errStack = err.stack;
      let errCode = 0;
      switch (typeof err) {
        case typeof UnauthorizedError:
          errDescription =
            "You are not authenticated with the system! Please login!";
          statusCode = (err as UnauthorizedError).statusCode;
          errDetails = (err as UnauthorizedError).message;
          errStack = (err as UnauthorizedError).stack;
          errCode = (err as UnauthorizedError).errorCode;
          break;
        default:
          break;
      }
      res.status(statusCode).json({
        errDescription,
        errDetails,
        ...(process.env.NODE_ENV === "development" && { errStack }),
        errCode,
      });
    } catch (error) {
      next(error);
    }
  }
}
