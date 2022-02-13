import { IBanRequestDetails } from "../interfaces/ban-request-details.interface";

/**
 * A ban request should contain a body with these properties.
 */
export class BanRequestDTO implements IBanRequestDetails {
  public id: string;
  public reason: string;

  constructor(data: IBanRequestDetails) {
    this.id = data.id;
    this.reason = data.reason;
  }
}
