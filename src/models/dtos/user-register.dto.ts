import { IUserRegister } from "../interfaces/user-register.interface";

/**
 * A registration request should contain a body with these properties.
 */
export class UserRegisterDTO implements IUserRegister {
  public email: string;
  public password: string;

  constructor(data: IUserRegister) {
    this.email = data.email?.toLowerCase();
    this.password = data.password;
  }
}
