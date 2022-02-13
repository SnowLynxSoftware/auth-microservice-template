import { UserLoginBasicDTO } from "../models/dtos/user-login-basic.dto";
import { UserEntity } from "../entities/user.entity";
import { UnauthorizedError } from "../errors/unauthorized.error";

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

  /**
   * Given the basic auth header, will rip out the user's access token.
   * @param header The full basic auth header.
   */
  public static getAccessTokenFromAuthHeader(header: string): string {
    const splitHeader = header.split(" ");
    return splitHeader[1];
  }

  /**
   * Ensure that a user status is clear for being issued a new access token.
   * @param user The user we want to check.
   * @param isPasswordReset If we are using this function on password reset--we want to allow the user to be unverified.
   * @private
   */
  public static validateUserStatusBeforeIssuingToken(
    user: UserEntity,
    isPasswordReset: boolean = false
  ): boolean {
    // We first need to make sure this user is not banned, archived, or marked unverified.
    if (user.isBanned) {
      throw new UnauthorizedError(`User Is Banned: [${user.banReason}]`);
    }
    if (!isPasswordReset && !user.verified) {
      throw new UnauthorizedError(
        "Please check your email to finish the verification process before trying to login!"
      );
    }
    if (user.archivedAt) {
      throw new UnauthorizedError(
        "This user is no longer active. Please reach out to support if you believe this to be an error!"
      );
    }
    return true;
  }
}
