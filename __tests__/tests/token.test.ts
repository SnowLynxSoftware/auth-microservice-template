import "jest";
import { TokenUtil } from "../../src/util/token.util";

describe("JWT Token Creation & Validation", () => {
  let testUserId = "1234567890";
  let testUserEmail = "test-email@test.com";

  let targetVerificationToken: string,
    targetAccessToken: string,
    targetRefreshToken: string;

  beforeEach(() => {});

  it("should create verification token", async () => {
    targetVerificationToken =
      TokenUtil.generateUserVerificationToken(testUserId);
    expect(targetVerificationToken).not.toBeNull();
    expect(targetVerificationToken).not.toBeUndefined();
  });

  it("should validate verification token", async () => {
    const decodedUserId = TokenUtil.validateUserVerificationToken(
      targetVerificationToken
    );
    expect(decodedUserId).not.toBeNull();
    expect(decodedUserId).not.toBeUndefined();
    expect(decodedUserId).toBe(testUserId);
  });

  it("should create access token", async () => {
    targetAccessToken = TokenUtil.generateUserAccessToken(
      testUserId,
      testUserEmail
    );
    expect(targetAccessToken).not.toBeNull();
    expect(targetAccessToken).not.toBeUndefined();
  });

  it("should validate access token", async () => {
    const decodedUserId = TokenUtil.validateUserAccessToken(targetAccessToken);
    expect(decodedUserId).not.toBeNull();
    expect(decodedUserId).not.toBeUndefined();
    expect(decodedUserId).toBe(testUserId);
  });

  it("should create refresh token", async () => {
    targetRefreshToken = TokenUtil.generateUserRefreshToken(testUserId);
    expect(targetRefreshToken).not.toBeNull();
    expect(targetRefreshToken).not.toBeUndefined();
  });

  it("should validate refresh token", async () => {
    const decodedUserId =
      TokenUtil.validateUserRefreshToken(targetRefreshToken);
    expect(decodedUserId).not.toBeNull();
    expect(decodedUserId).not.toBeUndefined();
    expect(decodedUserId).toBe(testUserId);
  });
});
