import { LogType } from "../models/enum/log-type.enum";
import { LogEntity } from "../entities/log.entity";

// USER_BANNED = "user_banned",
// USER_UNBANNED = "user_unbanned",
// USER_ARCHIVED = "user_archived",
// USER_RESTORED = "user_restored",
// USER_EMAIL_UPDATED = "user_email_updated",

export class LogService {
  /**
   * Log a user banned event.
   * @param userId The ID of the user we are banning.
   * @param email The email of the user that was banned.
   * @param bannedById The ID of the user that performed the ban.
   */
  public static async userBanned(
    userId: string,
    email: string,
    bannedById: string
  ): Promise<void> {
    try {
      await LogService.logEvent(
        LogType.USER_BANNED,
        `User Banned: [${userId} | ${email}] by [${bannedById}]`
      );
    } catch (error: any) {
      console.error(error.message);
      return;
    }
  }

  /**
   * Log a user unbanned event.
   * @param userId The ID of the user we are unbanning.
   * @param email The email of the user that was unbanned.
   * @param unbannedById The ID of the user that performed the unban.
   */
  public static async userUnbanned(
    userId: string,
    email: string,
    unbannedById: string
  ): Promise<void> {
    try {
      await LogService.logEvent(
        LogType.USER_UNBANNED,
        `User Unbanned: [${userId} | ${email}] by [${unbannedById}]`
      );
    } catch (error: any) {
      console.error(error.message);
      return;
    }
  }

  /**
   * Log a user password change event.
   * @param userId The ID of the user we are changing the password for.
   * @param email The email of the user that changed their password.
   */
  public static async userPasswordUpdated(
    userId: string,
    email: string
  ): Promise<void> {
    try {
      await LogService.logEvent(
        LogType.USER_PASSWORD_UPDATED,
        `User Password Updated: [${userId} | ${email}]`
      );
    } catch (error: any) {
      console.error(error.message);
      return;
    }
  }

  /**
   * Log a user login event.
   * @param userId The ID of the user we are logging the event for.
   * @param email The email of the user that logged in.
   */
  public static async userLogin(userId: string, email: string): Promise<void> {
    try {
      await LogService.logEvent(
        LogType.USER_LOGIN,
        `User Login: [${userId} | ${email}]`
      );
    } catch (error: any) {
      console.error(error.message);
      return;
    }
  }

  /**
   * Log a new user verified event.
   * @param userId The ID of the user we are logging the event for.
   * @param email The email of the user that was verified.
   */
  public static async newUserVerified(
    userId: string,
    email: string
  ): Promise<void> {
    try {
      await LogService.logEvent(
        LogType.USER_VERIFIED,
        `New User Verified: [${userId} | ${email}]`
      );
    } catch (error: any) {
      console.error(error.message);
      return;
    }
  }

  /**
   * Log a new user registered event.
   * @param userId The ID of the user we are logging the event for.
   * @param email The email of the user that registered.
   */
  public static async newUserRegistered(
    userId: string,
    email: string
  ): Promise<void> {
    try {
      await LogService.logEvent(
        LogType.USER_REGISTERED,
        `New User Registered: [${userId} | ${email}]`
      );
    } catch (error: any) {
      console.error(error.message);
      return;
    }
  }

  /**
   * Create the logged event in the database.
   * @param type The type of the logged event.
   * @param message The message details about the logged event.
   * @private
   */
  private static async logEvent(type: LogType, message: string): Promise<void> {
    const log = new LogEntity();
    log.logType = type;
    log.message = message;
    await log.save();
  }
}
