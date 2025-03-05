import { AxiosError } from "axios";

export type IErrorInterceptor = AxiosError<{ message?: string }>;
