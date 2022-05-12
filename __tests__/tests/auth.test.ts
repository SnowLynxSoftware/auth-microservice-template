import "jest";
import { AuthUtil } from "../../src/util/auth.util";

describe("Auth Headers & Credentials & Middleware Tests", () => {
  beforeEach(() => {});

  it("should be able to build user login dto from encoded auth header", async () => {
    const username: string = "myusername@email.com";
    const password: string = "mySecretP@ssw0rd";
    const encoded = Buffer.from(`${username}:${password}`, "utf-8").toString(
      "base64"
    );
    const loginBasicDTO = AuthUtil.getUserLoginBasicDTOFromAuthHeader(
      `Basic ${encoded}`
    );
    expect(loginBasicDTO).not.toBeNull();
    expect(loginBasicDTO).not.toBeUndefined();
    expect(loginBasicDTO.email).toMatch(username);
    expect(loginBasicDTO.password).toMatch(password);
  });

  it("should be able to get access token from auth header", async () => {
    const authTokenOriginal: string = "accessTokenCredentials_JWTExample";
    const accessToken = AuthUtil.getAccessTokenFromAuthHeader(
      `Bearer ${authTokenOriginal}`
    );
    expect(accessToken).not.toBeNull();
    expect(accessToken).not.toBeUndefined();
    expect(accessToken).toMatch(accessToken);
  });

  it("should validate user status as true", async () => {
    const userEntityMock = {
      isBanned: false,
      verified: true,
      archivedAt: null,
    };
    const isValidUserStatus = AuthUtil.validateUserStatusBeforeIssuingToken(
      userEntityMock as any,
      false
    );
    expect(isValidUserStatus).toBeTruthy();
  });
});
