import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../feature/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, Button, Alert, Typography, Card } from "antd";

const { Text } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  
  const onFinish = (values) => {
    dispatch(loginUser(values)).then((response) => {
      if (response.type === "auth/loginUser/fulfilled") {
        navigate("/Home");
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md p-6 shadow-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Login</h2>
          <p className="text-gray-500">Access your account</p>
        </div>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            className="mb-4"
          />
        )}

        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          initialValues={{ email: "", password: "" }}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" }
            ]}
          >
            <Input placeholder="Email" className="rounded-md p-2" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Password" className="rounded-md p-2" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-md py-2 transition duration-300"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-4">
          <Text type="secondary" className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Register here
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default Login;
