import { IUserPasswordResetRequest } from "../interfaces/user-password-reset-request.interface";

/**
 * A password reset request should contain a body with these properties.
 */
export class UserPasswordResetRequestDTO implements IUserPasswordResetRequest {
  public email: string;

  constructor(data: IUserPasswordResetRequest) {
    this.email = data.email?.toLowerCase();
  }
}
