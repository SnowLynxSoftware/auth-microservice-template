import { sign, verify } from "jsonwebtoken";

/**
 * Handles signing and creation of various tokens that the application will use.
 */
export class TokenUtil {
  /**
   * Some constants for our token information.
   */
  public static TOKEN_CONSTANTS = {
    VERIFICATION: {
      secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
      expiresIn: "1h",
      audience: "auth_verification_user",
      subject: "verification_token",
      issuer: "auth_microservice",
    },
    ACCESS: {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: "1h", // "5m" - After Refresh is working, I need to lower this to 5 minutes for security purposes.
      audience: "auth_access_user",
      subject: "access_token",
      issuer: "auth_microservice",
    },
    REFRESH: {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: "30 days",
      audience: "auth_access_user",
      subject: "access_token",
      issuer: "auth_microservice",
    },
  };

  /**
   * User Verifications tokens are generated when a new user is created or when a user is trying to reset their password.
   * They last for 1 hour--and allow us to verify that the user is who they say they are when making these specific requests.
   * @param userId The id of the user we are generating the verification token for.
   */
  public static generateUserVerificationToken(userId: string): string {
    if (!TokenUtil.TOKEN_CONSTANTS.VERIFICATION.secret) {
      console.error(
        "[JWT_VERIFICATION_TOKEN_SECRET] was not found in your environment!"
      );
      throw new Error("Please check for missing JWT Secrets!");
    }
    return sign(
      {
        id: userId,
      },
      TokenUtil.TOKEN_CONSTANTS.VERIFICATION.secret,
      {
        expiresIn: TokenUtil.TOKEN_CONSTANTS.VERIFICATION.expiresIn,
        audience: TokenUtil.TOKEN_CONSTANTS.VERIFICATION.audience,
        subject: TokenUtil.TOKEN_CONSTANTS.VERIFICATION.subject,
        issuer: TokenUtil.TOKEN_CONSTANTS.VERIFICATION.issuer,
      }
    );
  }

  /**
   * Validate the user verification token--if its valid--return the UserID--otherwise it errors.
   * @param token The Verification Token
   */
  public static validateUserVerificationToken(token: string): string {
    if (!TokenUtil.TOKEN_CONSTANTS.VERIFICATION.secret) {
      console.error(
        "[JWT_VERIFICATION_TOKEN_SECRET] was not found in your environment!"
      );
      throw new Error("Please check for missing JWT Secrets!");
    }
    const decodedData = verify(
      token,
      TokenUtil.TOKEN_CONSTANTS.VERIFICATION.secret,
      {
        audience: TokenUtil.TOKEN_CONSTANTS.VERIFICATION.audience,
        subject: TokenUtil.TOKEN_CONSTANTS.VERIFICATION.subject,
        issuer: TokenUtil.TOKEN_CONSTANTS.VERIFICATION.issuer,
      }
    );
    return (decodedData as any).id;
  }

  /**
   * User Access Tokens are generated here that allow authorization to the various applications in the tech stack.
   * Access Tokens are short lived and should be refreshed.
   * @param userId The id of the user we are generating the access token for.
   * @param email The email of the user we are generating the access token for.
   */
  public static generateUserAccessToken(userId: string, email: string): string {
    if (!TokenUtil.TOKEN_CONSTANTS.ACCESS.secret) {
      console.error(
        "[JWT_ACCESS_TOKEN_SECRET] was not found in your environment!"
      );
      throw new Error("Please check for missing JWT Secrets!");
    }
    return sign(
      {
        id: userId,
        email,
      },
      TokenUtil.TOKEN_CONSTANTS.ACCESS.secret,
      {
        expiresIn: TokenUtil.TOKEN_CONSTANTS.ACCESS.expiresIn,
        audience: TokenUtil.TOKEN_CONSTANTS.ACCESS.audience,
        subject: TokenUtil.TOKEN_CONSTANTS.ACCESS.subject,
        issuer: TokenUtil.TOKEN_CONSTANTS.ACCESS.issuer,
      }
    );
  }

  /**
   * Validate the user access token--if its valid--return the UserID--otherwise it errors.
   * @param token The Access Token
   */
  public static validateUserAccessToken(token: string): string {
    if (!TokenUtil.TOKEN_CONSTANTS.ACCESS.secret) {
      console.error(
        "[JWT_ACCESS_TOKEN_SECRET] was not found in your environment!"
      );
      throw new Error("Please check for missing JWT Secrets!");
    }
    const decodedData = verify(token, TokenUtil.TOKEN_CONSTANTS.ACCESS.secret, {
      audience: TokenUtil.TOKEN_CONSTANTS.ACCESS.audience,
      subject: TokenUtil.TOKEN_CONSTANTS.ACCESS.subject,
      issuer: TokenUtil.TOKEN_CONSTANTS.ACCESS.issuer,
    });
    return (decodedData as any).id;
  }

  /**
   * User Refresh Tokens are generated here that allow a user to generate a new access token.
   * @param userId The id of the user we are generating the refresh token for.
   */
  public static generateUserRefreshToken(userId: string): string {
    if (!TokenUtil.TOKEN_CONSTANTS.REFRESH.secret) {
      console.error(
        "[JWT_REFRESH_TOKEN_SECRET] was not found in your environment!"
      );
      throw new Error("Please check for missing JWT Secrets!");
    }
    return sign(
      {
        id: userId,
      },
      TokenUtil.TOKEN_CONSTANTS.REFRESH.secret,
      {
        expiresIn: TokenUtil.TOKEN_CONSTANTS.REFRESH.expiresIn,
        audience: TokenUtil.TOKEN_CONSTANTS.REFRESH.audience,
        subject: TokenUtil.TOKEN_CONSTANTS.REFRESH.subject,
        issuer: TokenUtil.TOKEN_CONSTANTS.REFRESH.issuer,
      }
    );
  }

  /**
   * Validate the user refresh token--if its valid--return the UserID--otherwise it errors.
   * @param token The Refresh Token
   */
  public static validateUserRefreshToken(token: string): string {
    if (!TokenUtil.TOKEN_CONSTANTS.REFRESH.secret) {
      console.error(
        "[JWT_REFRESH_TOKEN_SECRET] was not found in your environment!"
      );
      throw new Error("Please check for missing JWT Secrets!");
    }
    const decodedData = verify(
      token,
      TokenUtil.TOKEN_CONSTANTS.REFRESH.secret,
      {
        audience: TokenUtil.TOKEN_CONSTANTS.REFRESH.audience,
        subject: TokenUtil.TOKEN_CONSTANTS.REFRESH.subject,
        issuer: TokenUtil.TOKEN_CONSTANTS.REFRESH.issuer,
      }
    );
    return (decodedData as any).id;
  }
}
