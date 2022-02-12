import { IUserLoginBasic } from "../interfaces/user-login-basic.interface";

/**
 * A login request should contain a body with these properties.
 */
export class UserLoginBasicDTO implements IUserLoginBasic {
  public email: string;
  public password: string;

  constructor(data: IUserLoginBasic) {
    this.email = data.email?.toLowerCase();
    this.password = data.password;
  }
}
