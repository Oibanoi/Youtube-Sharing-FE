import { notification } from "antd";
import { IErrorInterceptor } from "../interface";
import { userServices } from "../services";

const handleResponseError = (error: IErrorInterceptor) => {
  const status = error && error.response && error.response.status;
  let message = null;
  switch (status) {
    case 401:
      userServices.logout();
      break;
    case 403:
      break;
    default:
      // Handle error message from API response
      if (error.response && error.response.data) {
        const { data } = error.response;
        message = data.detail;
      }
      notification.error({
        message: "Error",
        description: message || "SomethingWentWrong",
      });
      break;
  }
};
export const getResult = (response: any) => response.data;
export const getData = (response: any) => response.data.data;

export default {
  handleResponseError,
};
