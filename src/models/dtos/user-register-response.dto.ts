import { IUserRegisterResponse } from "../interfaces/user-register-response.interface";

/**
 * A successful registration response should contain a body with these properties.
 */
export class UserRegisterResponseDTO implements IUserRegisterResponse {
  public id: string;
  public email: string;
  public verificationToken: string;

  constructor(data: IUserRegisterResponse) {
    this.id = data.id;
    this.email = data.email;
    this.verificationToken = data.verificationToken;
  }
}
