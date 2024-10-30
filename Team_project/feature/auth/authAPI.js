// src/features/auth/authAPI.js

import axios from "axios";

export const API_URL = "http://localhost:3001"; // Base URL for the API

// API call to login a user
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    return response.data; // Return user data on successful login
  } catch (error) {
    if (error.response) {
      // Return specific error message based on server response
      if (error.response.status === 401) {
        throw new Error("Incorrect password. Please try again.");
      } else if (error.response.status === 404) {
        throw new Error("No user found with this email.");
      }
    }
    throw new Error("An unexpected error occurred."); // Default error message
  }
};

// API call to register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data; // Return success message on successful registration
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.error); // Return server-provided error
    }
    throw new Error("An unexpected error occurred."); // Default error message
  }
};
