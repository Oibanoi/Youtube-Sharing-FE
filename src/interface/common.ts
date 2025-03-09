import { AxiosError } from "axios";

export type IErrorInterceptor = AxiosError<{ detail?: string }>;
export type IPagination = {
  current_page?: number;
  page_size?: number;
  total_items?: number;
};
