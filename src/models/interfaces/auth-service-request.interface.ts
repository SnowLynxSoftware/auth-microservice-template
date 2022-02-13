import { Request } from "express";

/**
 * When accessing admin routes that require authorization--after verification of the access token,
 * we will place the userId in the request so we can use it later if we need to.
 */
export interface IAuthServiceRequest extends Request {
  userId: string;
  isSuperAdminUser: boolean;
}
