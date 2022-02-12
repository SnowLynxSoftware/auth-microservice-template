import { IUserVerify } from "../interfaces/user-verify.interface";

/**
 * A successful registration response should contain a body with these properties.
 */
export class UserVerifyDTO implements IUserVerify {
  public id: string;
  public verificationToken: string;

  constructor(data: IUserVerify) {
    this.id = data.id;
    this.verificationToken = data.verificationToken;
  }
}
