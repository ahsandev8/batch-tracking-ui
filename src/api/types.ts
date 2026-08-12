import { AxiosError } from "axios";

export interface ApiErrorResponse {
  detail?: string;
  message?: string;
}

export type ApiError = AxiosError<ApiErrorResponse>;
