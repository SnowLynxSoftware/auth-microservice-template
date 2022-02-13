"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const token_util_1 = require("../../src/util/token.util");
describe("JWT Token Creation & Validation", () => {
    let testUserId = "1234567890";
    let testUserEmail = "test-email@test.com";
    let targetVerificationToken, targetAccessToken, targetRefreshToken;
    beforeEach(() => { });
    it("should create verification token", async () => {
        targetVerificationToken =
            token_util_1.TokenUtil.generateUserVerificationToken(testUserId);
        expect(targetVerificationToken).not.toBeNull();
        expect(targetVerificationToken).not.toBeUndefined();
    });
    it("should validate verification token", async () => {
        const decodedUserId = token_util_1.TokenUtil.validateUserVerificationToken(targetVerificationToken);
        expect(decodedUserId).not.toBeNull();
        expect(decodedUserId).not.toBeUndefined();
        expect(decodedUserId).toBe(testUserId);
    });
    it("should create access token", async () => {
        targetAccessToken = token_util_1.TokenUtil.generateUserAccessToken(testUserId, testUserEmail);
        expect(targetAccessToken).not.toBeNull();
        expect(targetAccessToken).not.toBeUndefined();
    });
    it("should validate access token", async () => {
        const decodedUserId = token_util_1.TokenUtil.validateUserAccessToken(targetAccessToken);
        expect(decodedUserId).not.toBeNull();
        expect(decodedUserId).not.toBeUndefined();
        expect(decodedUserId).toBe(testUserId);
    });
    it("should create refresh token", async () => {
        targetRefreshToken = token_util_1.TokenUtil.generateUserRefreshToken(testUserId);
        expect(targetRefreshToken).not.toBeNull();
        expect(targetRefreshToken).not.toBeUndefined();
    });
    it("should validate refresh token", async () => {
        const decodedUserId = token_util_1.TokenUtil.validateUserRefreshToken(targetRefreshToken);
        expect(decodedUserId).not.toBeNull();
        expect(decodedUserId).not.toBeUndefined();
        expect(decodedUserId).toBe(testUserId);
    });
});
