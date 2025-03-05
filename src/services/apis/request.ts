import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { requestHelpers } from "../../helpers";
import { IErrorInterceptor } from "../../interface";
import { userServices } from "../index";

const baseClient = axios.create({
  baseURL: "http://0.0.0.0:8000/api/v1",
});

const getAuthorization = () => {
  return userServices.isLoggedIn()
    ? `Bearer ${userServices.getAccessToken()}`
    : "Bearer z";
};

// Do something before request is sent
const requestInterceptor = (request: InternalAxiosRequestConfig) => {
  Object.assign(request, {
    headers: {
      Authorization: getAuthorization(),
    },
  });
  return request;
};

// Any status code that lie within the range of 2xx cause this function to trigger
const responseSuccessInterceptor = (response: AxiosResponse) => {
  // Do something with response data
  return response;
};

// Any status codes that falls outside the range of 2xx cause this function to trigger
const responseErrorInterceptor = (error: IErrorInterceptor) => {
  // Do something with response error
  requestHelpers.handleResponseError(error);
  return Promise.reject(error);
};

const clients = [baseClient];

clients.forEach((client) => {
  client.interceptors.request.use(requestInterceptor);
  client.interceptors.response.use(
    responseSuccessInterceptor,
    responseErrorInterceptor
  );
});

export default {
  baseClient,
};
