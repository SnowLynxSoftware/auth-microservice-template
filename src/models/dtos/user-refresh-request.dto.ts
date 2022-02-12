import {IUserRefreshRequest} from "../interfaces/user-refresh-request.interface";

/**
 * A refresh token request should contain a body with these properties.
 */
export class UserRefreshRequestDTO implements IUserRefreshRequest {
    public refreshToken: string;

    constructor(data: IUserRefreshRequest) {
        this.refreshToken = data.refreshToken;
    }
}
