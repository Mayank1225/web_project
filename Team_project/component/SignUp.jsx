import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../feature/auth/authSlice";
import { Form, Input, Select, Button, Alert, Typography, Row, Col } from "antd";

const { Text } = Typography;
const { Option } = Select;

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    accountType: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, accountType: value });
  };

  const handleSubmit = async (values) => {
    // Check if password and confirm password match
    if (values.password !== values.confirmPassword) {
      return Alert.error("Passwords do not match!");
    }

    try {
      const response = await dispatch(registerUser(values));
      if (response.type === "auth/registerUser/fulfilled") {
        navigate("/login");
      } else if (response.payload && response.payload.error) {
        throw new Error(response.payload.error);
      }
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div style={{ maxWidth: '700px' }} className="w-full max-w-xl p-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold text-gray-800">Sign Up</h2>
          <p className="text-gray-500">Create a new account</p>
        </div>

        {error && (
          <Alert message={error} type="error" showIcon className="mb-4" />
        )}

        <Form layout="vertical" onFinish={handleSubmit}>
          <Row gutter={[24, 16]}>
            <Col xs={24} sm={12} md={12} lg={12}>
              <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: "Please enter your first name!" }]}>
                <Input
                  type="text"
                  placeholder="Enter your first name"
                  className="rounded-md p-2"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={12}>
              <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: "Please enter your last name!" }]}>
                <Input
                  type="text"
                  placeholder="Enter your last name"
                  className="rounded-md p-2"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 16]}>
            <Col xs={24} sm={12} md={12} lg={12}>
              <Form.Item label="Mobile" name="mobile" rules={[{ required: true, message: "Please enter your mobile number!" }]}>
                <Input
                  type="tel"
                  placeholder="Enter your mobile number"
                  className="rounded-md p-2"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={12}>
              <Form.Item label="Account Type" name="accountType" rules={[{ required: true, message: "Please select your account type!" }]}>
                <Select
                  placeholder="Select account type"
                  className="rounded-md"
                  dropdownStyle={{ borderRadius: "0.375rem" }}
                  size="large"
                >
                  <Option value="">Select account type</Option>
                  <Option value="buyer">Buyer</Option>
                  <Option value="seller">Seller</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              className="rounded-md p-2"
            />
          </Form.Item>

          <Row gutter={[24, 16]}>
            <Col xs={24} sm={12} md={12} lg={12}>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please enter your password!" }]}
              >
                <Input.Password
                  placeholder="Enter your password"
                  className="rounded-md p-2"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={12}>
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                rules={[{ required: true, message: "Please confirm your password!" }]}
              >
                <Input.Password
                  placeholder="Confirm your password"
                  className="rounded-md p-2"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-md py-2 transition duration-300"
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center">
          <Text type="secondary" className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login here
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Signup;
