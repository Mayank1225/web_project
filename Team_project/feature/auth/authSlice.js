// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser as apiLoginUser, registerUser as apiRegisterUser } from './authAPI';

export const loginUser = createAsyncThunk("auth/loginUser", async (formData, { rejectWithValue }) => {
  try {
    return await apiLoginUser(formData.email, formData.password); // Call the API directly
  } catch (error) {
    return rejectWithValue(error.message); // Use the error message directly
  }
});

export const registerUser = createAsyncThunk("auth/registerUser", async (formData, { rejectWithValue }) => {
  try {
    return await apiRegisterUser(formData);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
     ; // Remove email from local storage on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", state.user.userEmail); // Store user object
         // Store user email
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
