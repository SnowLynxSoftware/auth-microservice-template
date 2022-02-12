import { UserLoginBasicDTO } from "../models/dtos/user-login-basic.dto";

/**
 * Some basic auth-related utility functions.
 */
export class AuthUtil {
  /**
   * Given the basic auth header, will rip out the user credentials and return the DTO.
   * @param header The full basic auth header.
   */
  public static getUserLoginBasicDTOFromAuthHeader(
    header: string
  ): UserLoginBasicDTO {
    const splitHeader = header.split(" ");
    const decodedCredentialsString = Buffer.from(
      splitHeader[1],
      "base64"
    ).toString("utf8");
    const splitCredentials = decodedCredentialsString.split(":");
    return new UserLoginBasicDTO({
      email: splitCredentials[0],
      password: splitCredentials[1],
    });
  }
}
