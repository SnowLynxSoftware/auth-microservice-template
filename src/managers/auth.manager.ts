import { UserRegisterDTO } from "../models/dtos/user-register.dto";
import { UserService } from "../service/user.service";
import { CryptoUtil } from "../util/crypto.util";
import { TokenUtil } from "../util/token.util";
import { IUserRegisterResponse } from "../models/interfaces/user-register-response.interface";
import { UserRegisterResponseDTO } from "../models/dtos/user-register-response.dto";
import { UserVerifyDTO } from "../models/dtos/user-verify.dto";
import { IUserLoginResponse } from "../models/interfaces/user-login-response.interface";
import { UserLoginBasicDTO } from "../models/dtos/user-login-basic.dto";
import { UserPasswordResetRequestDTO } from "../models/dtos/user-password-reset-request.dto";
import { UserPasswordResetVerifyRequestDTO } from "../models/dtos/user-password-reset-verify-request.dto";
import { LogService } from "../service/log.service";
import { AuthUtil } from "../util/auth.util";
import { UnauthorizedError } from "../errors/unauthorized.error";

/**
 * Various auth related
 */
export class AuthManager {
  /**
   * Log the user into the system by generating access/refresh tokens.
   * @param userLoginDTO The basic email/password that we want to use to log a user in with.
   */
  public static async loginBasic(
    userLoginDTO: UserLoginBasicDTO
  ): Promise<IUserLoginResponse> {
    // Get the user with the specified email if they exist.
    const user = await UserService.getUserByEmail(userLoginDTO.email);
    if (!user) {
      throw new UnauthorizedError(
        "Your login information was incorrect. Please try again!"
      );
    } else {
      AuthUtil.validateUserStatusBeforeIssuingToken(user);
      // Make sure the password is valid
      const isValidPassword = await CryptoUtil.verifyHash(
        userLoginDTO.password,
        user.hash
      );
      if (!isValidPassword) {
        throw new UnauthorizedError(
          "Your login information was incorrect. Please try again!"
        );
      } else {
        // Create our tokens
        const accessToken = TokenUtil.generateUserAccessToken(
          user.id,
          user.email
        );
        const refreshToken = TokenUtil.generateUserRefreshToken(user.id);

        // Lastly set lastLogin time for historical reference.
        await UserService.updateUserLastLoginDateToNow(user.id);
        await LogService.userLogin(user.id, user.email);
        return {
          accessToken,
          refreshToken,
        };
      }
    }
  }

  /**
   * Register a new user account.
   * @param userRegisterDTO The properties of the new user that we want to create.
   */
  public static async registerNewUser(
    userRegisterDTO: UserRegisterDTO
  ): Promise<IUserRegisterResponse> {
    // Check if the user already exists first.
    const existingUser = await UserService.getUserByEmail(
      userRegisterDTO.email
    );
    if (existingUser) {
      throw new Error("A user with this email address already exists!");
    }

    // Hash the user's password.
    const passwordHash = await CryptoUtil.hashMessage(userRegisterDTO.password);
    const newUser = await UserService.createNewUser(
      userRegisterDTO.email,
      passwordHash
    );

    // Generate a verification token
    const verificationToken = TokenUtil.generateUserVerificationToken(
      newUser.id
    );

    await LogService.newUserRegistered(newUser.id, newUser.email);

    return new UserRegisterResponseDTO({
      id: newUser.id,
      email: newUser.email,
      verificationToken,
    });
  }

  /**
   * Verify the new user account.
   * @param userVerifyDTO
   */
  public static async verifyNewUser(
    userVerifyDTO: UserVerifyDTO
  ): Promise<void> {
    const decodedUserId = TokenUtil.validateUserVerificationToken(
      userVerifyDTO.verificationToken
    );
    if (decodedUserId !== userVerifyDTO.id) {
      throw new UnauthorizedError(
        "The verification token could not be validated!"
      );
    } else {
      const user = await UserService.markUserVerified(decodedUserId);
      await LogService.newUserVerified(user.id, user.email);
      return;
    }
  }

  /**
   * Given a valid refresh token--generate a new access token for the user.
   * @param refreshToken
   */
  public static async refreshAccessToken(
    refreshToken: string
  ): Promise<string> {
    const decodedUserId = TokenUtil.validateUserRefreshToken(refreshToken);
    const user = await UserService.getUserByID(decodedUserId);
    if (!user) {
      throw new UnauthorizedError(
        "Your refresh request could not be completed! Please try logging in again!"
      );
    } else {
      AuthUtil.validateUserStatusBeforeIssuingToken(user);
      const accessToken = TokenUtil.generateUserAccessToken(
        user.id,
        user.email
      );
      await UserService.updateUserLastLoginDateToNow(user.id);
      return accessToken;
    }
  }

  /**
   * Return a verification token for the specified user account so we can email them about verifying their identity before allowing a password reset.
   * @param resetInfo Contains the user's email address that we want to request the password reset for.
   */
  public static async requestUserPasswordReset(
    resetInfo: UserPasswordResetRequestDTO
  ): Promise<UserRegisterResponseDTO> {
    const user = await UserService.getUserByEmail(resetInfo.email);
    if (!user) {
      throw new UnauthorizedError(
        "An error occurred when attempting to generate a password reset request. Please try again!"
      );
    } else {
      AuthUtil.validateUserStatusBeforeIssuingToken(user, true);
      // Generate a verification token
      const verificationToken = TokenUtil.generateUserVerificationToken(
        user.id
      );
      return new UserRegisterResponseDTO({
        id: user.id,
        email: user.email,
        verificationToken,
      });
    }
  }

  /**
   * If the verification token is valid--we can update the user's hashed password.
   * @param resetInfo The user's reset information.
   */
  public static async verifyUserPasswordReset(
    resetInfo: UserPasswordResetVerifyRequestDTO
  ): Promise<void> {
    const decodedUserId = TokenUtil.validateUserVerificationToken(
      resetInfo.verificationToken
    );
    if (decodedUserId !== resetInfo.id) {
      throw new UnauthorizedError(
        "The verification token could not be validated!"
      );
    } else {
      const user = await UserService.getUserByID(resetInfo.id);
      if (!user) {
        throw new UnauthorizedError(
          "An error occurred when attempting to generate a password reset request. Please try again!"
        );
      } else {
        AuthUtil.validateUserStatusBeforeIssuingToken(user, true);
        // Hash the new password
        const hash = await CryptoUtil.hashMessage(resetInfo.password);
        await UserService.updateUserHash(user.id, hash);
        await LogService.userPasswordUpdated(user.id, user.email);
        return;
      }
    }
  }
}
