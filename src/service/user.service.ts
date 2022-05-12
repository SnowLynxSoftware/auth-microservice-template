import { UserEntity } from "../entities/user.entity";

/**
 * Handles all calls to the database for Users.
 */
export class UserService {
  /**
   * Create a new user in the database with the given information.
   * @param email The email we want to create the user with.
   * @param hash The user's hashed password.
   */
  public static async createNewUser(
    email: string,
    hash: string
  ): Promise<UserEntity> {
    const newUser = new UserEntity();
    newUser.email = email;
    newUser.hash = hash;
    return newUser.save();
  }

  /**
   * Get a user by their ID.
   * @param id The ID of the user we want to get.
   */
  public static async getUserByID(id: string): Promise<UserEntity | null> {
    return UserEntity.findOneOrFail({ where: [{ id }] });
  }

  /**
   * Get a user by their email address.
   * @param email The email we want to find the user by.
   */
  public static async getUserByEmail(
    email: string
  ): Promise<UserEntity | null> {
    const user = await UserEntity.findOne({
      where: [
        {
          email,
        },
      ],
    });
    if (user) {
      return user;
    } else {
      return null;
    }
  }

  /**
   * Given a user id, will mark the user as verified in the system.
   * @param userId The ID of the user we want to verify.
   */
  public static async markUserVerified(userId: string): Promise<UserEntity> {
    const user = await UserService.getUserByID(userId);
    if (!user) {
      throw new Error("User could not be found!");
    } else {
      user.verified = true;
      return user.save();
    }
  }

  /**
   * Update the user's hashed password in the database.
   * @param userId The ID of the user we want to update.
   * @param hash The new hashed password that we want to store for the user.
   */
  public static async updateUserHash(
    userId: string,
    hash: string
  ): Promise<UserEntity> {
    const user = await UserService.getUserByID(userId);
    if (!user) {
      throw new Error("User could not be found!");
    } else {
      user.hash = hash;
      return user.save();
    }
  }

  /**
   * Update the user's hashed password in the database.
   * @param userId The ID of the user we want to update.
   */
  public static async updateUserLastLoginDateToNow(
    userId: string
  ): Promise<UserEntity> {
    const user = await UserService.getUserByID(userId);
    if (!user) {
      throw new Error("User could not be found!");
    } else {
      user.lastLogin = new Date(Date.now());
      return user.save();
    }
  }

  /**
   * Ban a user account from access the systems by their ID and give a reason.
   * This will prevent any future logins to the system with the specified email address.
   * @param userId The ID of the user we want to ban.
   * @param reason The reason for the ban that might be shown to the user if they attempt to log in (or for our historical logs.)
   */
  public static async banUserByIdWithReason(
    userId: string,
    reason: string
  ): Promise<UserEntity> {
    const user = await UserService.getUserByID(userId);
    if (!user) {
      throw new Error("User could not be found!");
    } else {
      user.isBanned = true;
      user.banReason = reason;
      user.archivedAt = new Date(Date.now());
      return user.save();
    }
  }

  /**
   * Unban a user account.
   * @param userId The ID of the user we want to unban.
   */
  public static async unbanUserById(userId: string): Promise<UserEntity> {
    const user = await UserService.getUserByID(userId);
    if (!user) {
      throw new Error("User could not be found!");
    } else {
      user.isBanned = false;
      user.banReason = "";
      // When a user is unbanned--we require them to go through a "Forgot Your Password" reset process.
      user.verified = false;
      // @ts-ignore
      user.archivedAt = null;
      return user.save();
    }
  }
}
