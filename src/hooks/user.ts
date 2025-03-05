import { useState } from "react";
import { useUser } from "../context";
import { userServices } from "../services";
import { ISignUpPayload } from "../interface";
import { notification } from "antd";
const useUserHook = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();
  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      const res = await userServices.login(username, password);
      console.log(res.accessToken);
      if (res.accessToken) {
        const token = res.accessToken;
        const email = res.email;
        localStorage.setItem("token", token);
        setUser({ email: email });
        localStorage.setItem("email", email);
      }
    } finally {
      setLoading(false);
    }
  };
  const signUp = async (payload: ISignUpPayload) => {
    try {
      setLoading(true);
      const res = await userServices.signUp(payload);
      if (res) {
        notification.success({
          message: "Create user successfully",
        });
      }
    } catch (error) {
      notification.error({
        message: "Create user failed",
      });
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    login,
    signUp,
  };
};
export default {
  useUserHook,
};
