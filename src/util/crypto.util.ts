import { hash, compare } from "bcrypt";

/**
 * A basic wrapper for handling our BCrypt hashes.
 */
export class CryptoUtil {
  /**
   * Hash a given string message.
   * @param message The message we want to hash.
   */
  public static async hashMessage(message: string): Promise<string> {
    return hash(message, 13);
  }

  /**
   * Verify that the specified plain text is a match for the current hash.
   * @param message The plain text message that we want to test.
   * @param hash The hash we want to test against.
   */
  public static async verifyHash(
    message: string,
    hash: string
  ): Promise<boolean> {
    try {
      // We force the await to return a result here so if there is an error we can catch it here.
      // We don't want an error here to bubble up the request and instead just return false.
      const result = await compare(message, hash);
      return result;
    } catch (error: any) {
      console.error(error.message);
      return false;
    }
  }
}
