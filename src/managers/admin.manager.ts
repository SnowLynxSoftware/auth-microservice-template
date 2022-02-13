import { UserEntity } from "../entities/user.entity";
import { UserService } from "../service/user.service";
import { BanRequestDTO } from "../models/dtos/ban-request-details.dto";
import { LogService } from "../service/log.service";

export class AdminManager {
  /**
   * Ban a user with the given details.
   * @param banRequestDetails The details of the user we want to ban.
   * @param bannedById The ID of the user that performed the ban.
   */
  public static async banUser(
    banRequestDetails: BanRequestDTO,
    bannedById: string
  ): Promise<UserEntity> {
    const bannedUser = await UserService.banUserByIdWithReason(
      banRequestDetails.id,
      banRequestDetails.reason
    );
    await LogService.userBanned(bannedUser.id, bannedUser.email, bannedById);
    return bannedUser;
  }

  /**
   * Unban a user with the given details.
   * @param userId The details of the user we want to unban.
   * @param unbannedById The ID of the user that performed the unban.
   */
  public static async unBanUser(
    userId: string,
    unbannedById: string
  ): Promise<UserEntity> {
    const unbannedUser = await UserService.unbanUserById(userId);
    await LogService.userUnbanned(
      unbannedUser.id,
      unbannedUser.email,
      unbannedById
    );
    return unbannedUser;
  }
}
