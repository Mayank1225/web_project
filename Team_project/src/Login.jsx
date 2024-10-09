import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  // Validate form fields
  const validateField = (name, value) => {
    let fieldErrors = {};

    if (name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) fieldErrors.email = "Email is required";
      else if (!emailPattern.test(value))
        fieldErrors.email = "Invalid email address";
    }

    if (name === "password") {
      if (!value) fieldErrors.password = "Password is required";
    }

    return fieldErrors;
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      ...validateField(name, value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateField("email", formData.email);
    const passwordErrors = validateField("password", formData.password);
  
    // Merge all form errors
    const allErrors = { ...formErrors, ...passwordErrors };
    setErrors(allErrors);
  
    if (Object.keys(allErrors).length === 0) {
      // Proceed with login request if no validation errors
      setErrors(""); // Clear previous errors
  
      axios
        .post("http://localhost:3001/login", {
          email: formData.email,
          password: formData.password,
        })
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem('isAuthenticated', 'true');
            navigate("/Home");
          }
        })
        .catch((error) => {
          // Handle the error when incorrect password is provided
          if (error.response && error.response.status === 401) {
            setLoginError("Incorrect password. Please try again.");
          } else if (error.response && error.response.status === 404) {
            setLoginError("No user found with this email.");
          } else {
            setLoginError("An unexpected error occurred.");
          }
        });
    }
  };
  

  return (
    <div className="container mt-5 col-md-6">
      <h2 className="text-center">Login</h2>

      {/* Error Alert */}
      {loginError && (
        <div className="alert alert-danger" role="alert">
          {loginError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-4">
        {/* Email */}
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className={`form-control ${
              errors.email ? "is-invalid" : formData.email && "is-valid"
            }`}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
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
              errors.password ? "is-invalid" : formData.password && "is-valid"
            }`}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            required
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>

      <p className="mt-3">
        Don't have an account? <Link to="/register">Sign up here</Link>.
      </p>
    </div>
  );
};

export default Login;
