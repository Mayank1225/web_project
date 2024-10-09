import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    accountType: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptPolicy: false,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = "";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobilePattern = /^\d{10}$/;

    switch (name) {
      case "firstName":
        if (!value) error = "First name is required";
        break;
      case "lastName":
        if (!value) error = "Last name is required";
        break;
      case "mobile":
        if (!value || !mobilePattern.test(value))
          error = "Invalid mobile number";
        break;
      case "accountType":
        if (!value) error = "Account type is required";
        break;
      case "email":
        if (!value || !emailPattern.test(value))
          error = "Invalid email address";
        break;
      case "password":
        if (!value || value.length < 6)
          error = "Password must be at least 6 characters";
        break;
      case "confirmPassword":
        if (value !== formData.password) error = "Passwords do not match";
        break;
      case "acceptPolicy":
        if (!value) error = "You must accept the privacy policy";
        break;
      default:
        break;
    }

    return error;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: updatedValue,
    });

    // Validate the field immediately
    const error = validateField(name, updatedValue);
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  const validateForm = () => {
    let formErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) formErrors[key] = error;
    });

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const isValid = (field) => {
    return !errors[field] && formData[field] !== "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      axios
        .post("http://localhost:3001/register", {
          firstName: formData.firstName,
          lastName: formData.lastName,
          mobile: formData.mobile,
          accountType: formData.accountType,
          email: formData.email,
          password: formData.password,
        })
        .then((response) => {
          setSuccess("User successfully registered. Now you can login.");
          setErrors({});
          setFormData({
            firstName: "",
            lastName: "",
            mobile: "",
            accountType: "",
            email: "",
            password: "",
            confirmPassword: "",
            acceptPolicy: false,
          });
          setTimeout(() => navigate("/login"), 1500);
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            setErrors({ serverError: error.response.data.error });
          }
        });
    }
  };

  return (
    <div className="container mt-5 col-md-6">
      <h2 className="text-center">Sign Up</h2>

      {/* Success Alert */}
      {success && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-4">
        {/* First Name */}
        <div className="form-group mb-3">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className={`form-control ${
              errors.firstName
                ? "is-invalid"
                : isValid("firstName")
                ? "is-valid"
                : ""
            }`}
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Enter your first name"
          />
          {errors.firstName && (
            <div className="invalid-feedback">{errors.firstName}</div>
          )}
        </div>

        {/* Last Name */}
        <div className="form-group mb-3">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className={`form-control ${
              errors.lastName
                ? "is-invalid"
                : isValid("lastName")
                ? "is-valid"
                : ""
            }`}
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Enter your last name"
          />
          {errors.lastName && (
            <div className="invalid-feedback">{errors.lastName}</div>
          )}
        </div>

        {/* Mobile Number */}
        <div className="form-group mb-3">
          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="tel"
            className={`form-control ${
              errors.mobile ? "is-invalid" : isValid("mobile") ? "is-valid" : ""
            }`}
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            placeholder="Enter your mobile number"
          />
          {errors.mobile && (
            <div className="invalid-feedback">{errors.mobile}</div>
          )}
        </div>

        {/* Account Type */}
        <div className="form-group mb-3">
          <label htmlFor="accountType">Account Type</label>
          <select
            className={`form-control ${
              errors.accountType
                ? "is-invalid"
                : isValid("accountType")
                ? "is-valid"
                : ""
            }`}
            id="accountType"
            name="accountType"
            value={formData.accountType}
            onChange={handleInputChange}
          >
            <option value="">Select account type</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
          {errors.accountType && (
            <div className="invalid-feedback">{errors.accountType}</div>
          )}
        </div>

        {/* Email */}
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className={`form-control ${
              errors.email ? "is-invalid" : isValid("email") ? "is-valid" : ""
            }`}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        {/* Password */}
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className={`form-control ${
              errors.password
                ? "is-invalid"
                : isValid("password")
                ? "is-valid"
                : ""
            }`}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="form-group mb-3">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className={`form-control ${
              errors.confirmPassword
                ? "is-invalid"
                : isValid("confirmPassword")
                ? "is-valid"
                : ""
            }`}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <div className="invalid-feedback">{errors.confirmPassword}</div>
          )}
        </div>

        {/* Accept Privacy Policy */}
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className={`form-check-input ${
              errors.acceptPolicy
                ? "is-invalid"
                : isValid("acceptPolicy")
                ? "is-valid"
                : ""
            }`}
            id="acceptPolicy"
            name="acceptPolicy"
            checked={formData.acceptPolicy}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="acceptPolicy">
            I accept the privacy policy
          </label>
          {errors.acceptPolicy && (
            <div className="text-danger">{errors.acceptPolicy}</div>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>

      <p className="mt-3">
        Already have an account? <Link to="/login">Login here</Link>.
      </p>
    </div>
  );
};

export default Signup;
