import { IUserPasswordResetVerifyRequest } from "../interfaces/user-password-reset-verify-request.interface";
import { UserPasswordResetRequestDTO } from "./user-password-reset-request.dto";

/**
 * A password reset verify request should contain a body with these properties.
 */
export class UserPasswordResetVerifyRequestDTO
  extends UserPasswordResetRequestDTO
  implements IUserPasswordResetVerifyRequest
{
  public id: string;
  public password: string;
  public verificationToken: string;

  constructor(data: IUserPasswordResetVerifyRequest) {
    super({ email: data.email });
    this.id = data.id;
    this.password = data.password;
    this.verificationToken = data.verificationToken;
  }
}
