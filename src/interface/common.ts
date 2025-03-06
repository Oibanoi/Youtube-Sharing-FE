import { AxiosError } from "axios";

export type IErrorInterceptor = AxiosError<{ message?: string }>;
export type IPagination = {
  currentPage?: number;
  pageSize?: number;
  totalItems?: number;
};
