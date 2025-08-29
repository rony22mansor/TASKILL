import React from "react";

import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PMDashboardPage from "./pages/PMDashboardPage";
import EDashboardPage from "./pages/EDashboardPage copy";
import HomeRedirect from "./components/HomeRedirect";
import AdminLoginPage from "./pages/AdminLoginPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/admin_login",
    element: <AdminLoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/", // Root path is now the redirect handler
    element: (
      <ProtectedRoute>
        <HomeRedirect />
      </ProtectedRoute>
    ),
  },
  {
    path: "/pmdashboard",
    element: (
      <ProtectedRoute>
        <PMDashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/edashboard",
    element: (
      <ProtectedRoute>
        <EDashboardPage />
      </ProtectedRoute>
    ),
  },
]);
