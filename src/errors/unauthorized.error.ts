export class UnauthorizedError extends Error {
  public statusCode: number;
  public errorCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 401;
    this.errorCode = 1000;
  }
}
