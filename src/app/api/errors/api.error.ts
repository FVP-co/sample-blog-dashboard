import { isAxiosError, type AxiosInstance } from "axios";

export class ApiError extends Error {
  public readonly statusCode: number = 0;

  constructor(error: Error | AxiosInstance) {
    super();
    if (isAxiosError(error)) {
      this.statusCode = error.status || 0;
    }
  }

  get redirectTo() {
    switch (this.statusCode) {
      case 401:
        return "/auth/login";
      default:
        return "";
    }
  }
}
