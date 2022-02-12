import { IUserPasswordResetRequest } from "./user-password-reset-request.interface";

export interface IUserPasswordResetVerifyRequest
  extends IUserPasswordResetRequest {
  id: string;
  verificationToken: string;
  password: string;
}
