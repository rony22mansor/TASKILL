// src/components/HomeRedirect.jsx

import { LocalStorageKeys, UserRoles } from "@/lib/constants";
import React from "react";
import { Navigate } from "react-router-dom";

const HomeRedirect = () => {
  const userString = localStorage.getItem(LocalStorageKeys.USER);

  // 2. It's good practice to check if the data actually exists.
  if (userString) {
    try {
      const user = JSON.parse(userString);
      const role = user.role;

      if (role === UserRoles.ProjectManager) {
        return <Navigate to="/pmdashboard" replace />;
      } else if (role === UserRoles.EMPLOYEE) {
        return <Navigate to="/edashboard" replace />;
      } else {
        return <Navigate to="/login" replace />;
      }
    } catch (error) {
      return <Navigate to="/login" replace />;
    }
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default HomeRedirect;
