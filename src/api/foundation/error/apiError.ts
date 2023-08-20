export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  static badReq(message: string) {
    return new ApiError(400, message);
  }
  static unAuthorized(message: string) {
    return new ApiError(401, message);
  }
  static internal(message: string) {
    return new ApiError(500, message);
  }
  static fordbiden(message: string) {
    return new ApiError(503, message);
  }
}
