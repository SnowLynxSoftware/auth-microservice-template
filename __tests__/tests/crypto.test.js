"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const crypto_util_1 = require("../../src/util/crypto.util");
describe("Encryption & Hashing Tests", () => {
    const rawTestMessage = "p@ssw0rdT3$t34";
    let encryptedValue = "";
    beforeEach(() => { });
    it("should hash the given string message", async () => {
        encryptedValue = await crypto_util_1.CryptoUtil.hashMessage(rawTestMessage);
        expect(encryptedValue).not.toBeNull();
        expect(encryptedValue).not.toBeUndefined();
    });
    it("should verify the given string message with the original hash", async () => {
        const isValid = await crypto_util_1.CryptoUtil.verifyHash(rawTestMessage, encryptedValue);
        expect(isValid).not.toBeNull();
        expect(isValid).not.toBeUndefined();
        expect(isValid).toBeTruthy();
    });
    it("should NOT verify the given string message with the original hash", async () => {
        const isValid = await crypto_util_1.CryptoUtil.verifyHash(rawTestMessage + "-salt", encryptedValue);
        expect(isValid).not.toBeNull();
        expect(isValid).not.toBeUndefined();
        expect(isValid).toBeFalsy();
    });
});
