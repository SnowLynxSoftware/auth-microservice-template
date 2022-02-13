import "jest";
import { CryptoUtil } from "../../src/util/crypto.util";

describe("Encryption & Hashing Tests", () => {
  const rawTestMessage: string = "p@ssw0rdT3$t34";
  let encryptedValue: string = "";

  beforeEach(() => {});

  it("should hash the given string message", async () => {
    encryptedValue = await CryptoUtil.hashMessage(rawTestMessage);
    expect(encryptedValue).not.toBeNull();
    expect(encryptedValue).not.toBeUndefined();
  });

  it("should verify the given string message with the original hash", async () => {
    const isValid = await CryptoUtil.verifyHash(rawTestMessage, encryptedValue);
    expect(isValid).not.toBeNull();
    expect(isValid).not.toBeUndefined();
    expect(isValid).toBeTruthy();
  });

  it("should NOT verify the given string message with the original hash", async () => {
    const isValid = await CryptoUtil.verifyHash(
      rawTestMessage + "-salt",
      encryptedValue
    );
    expect(isValid).not.toBeNull();
    expect(isValid).not.toBeUndefined();
    expect(isValid).toBeFalsy();
  });
});
