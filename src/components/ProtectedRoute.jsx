import { LocalStorageKeys } from "@/lib/constants";
import * as React from "react";

import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem(LocalStorageKeys.TOKEN);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
