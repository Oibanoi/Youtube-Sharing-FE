import { requestServices } from "../../services";
import { getData } from "../../helpers/request";
import { ILogin, ISignUpPayload, ISignUpResponse } from "../../interface/user";

const { baseClient } = requestServices;

const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  // return true;
  return !!token;
};
const getMe = () => {
  return localStorage.getItem("email");
};
const logout = async () => {
  localStorage.removeItem("token");
};
const login = (username: string, password: string): Promise<ILogin> => {
  return baseClient
    .post("/login", { username: username, password: password })
    .then(getData);
};
const signUp = (payload: ISignUpPayload): Promise<ISignUpResponse> => {
  return baseClient.post("/register", payload).then(getData);
};
const getAccessToken = () => {
  return localStorage.getItem("token");
};

export default {
  signUp,
  isLoggedIn,
  logout,
  login,
  getAccessToken,
  getMe,
};
