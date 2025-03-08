import React from "react";
import { Form, Input, Button, message } from "antd";
import { userHooks } from "../../hooks";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const { signUp } = userHooks.useUserHook();
  const handleSubmit = (values: any) => {
    message.success("Registration successful!");
    signUp({ email: values.email, password: values.password }).then(() => {
      navigate("/");
    });
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "400px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h3>Register</h3>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
        }}
      >
        {/* Email Field */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "The input is not valid E-mail!" },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        {/* Password Field */}
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        {/* Confirm Password Field */}
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm your password" />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
