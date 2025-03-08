import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { userServices } from "../index";
const baseClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const getAuthorization = () => {
  return userServices.isLoggedIn()
    ? `Bearer ${userServices.getAccessToken()}`
    : "";
};

const requestInterceptor = (request: InternalAxiosRequestConfig) => {
  request.headers.Authorization = getAuthorization();
  return request;
};

const responseSuccessInterceptor = (response: AxiosResponse) => {
  return response;
};

const clients = [baseClient];

clients.forEach((client) => {
  client.interceptors.request.use(requestInterceptor);
  client.interceptors.response.use(responseSuccessInterceptor);
});

export default {
  baseClient,
};
