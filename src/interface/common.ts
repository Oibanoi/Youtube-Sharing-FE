import { AxiosError } from "axios";

export type IErrorInterceptor = AxiosError<{ detail?: string }>;
export type IPagination = {
  currentPage?: number;
  pageSize?: number;
  totalItems?: number;
};
