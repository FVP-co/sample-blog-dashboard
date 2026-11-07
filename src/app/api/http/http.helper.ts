import type { AxiosError, AxiosRequestConfig } from "axios";
import { ApiError } from "../errors/api.error";
import { HttpEngine } from "./http.engine";

// type Input<T extends object> = () => Promise<T>;
type Input = AxiosRequestConfig;
type Output<T extends object> =
  | {
      isOK: true;
      data: T;
    }
  | {
      isOK: false;
      error: ApiError;
    };

export async function httpRequest<T extends object>(
  requestConfig: Input,
): Promise<Output<T>> {
  try {
    const response = await HttpEngine.http.request<T>(requestConfig);
    return { isOK: true, data: response.data };
  } catch (error) {
    return {
      isOK: false,
      error: new ApiError(error as AxiosError),
    };
  }
}
