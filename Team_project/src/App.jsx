import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute";
import SignupPage from "./SignUpPage";
import LoginPage from "./LoginPage";
import AddProductPage from "../Pages/AddProductPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />, // Redirect from root to /login
  },
  {
    path: "/register",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/AddProduct",
    element: (
      <ProtectedRoute>
        <AddProductPage/>
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
