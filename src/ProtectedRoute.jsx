import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
  useEffect(() => {
    if (!user) {
      window.location.href = "/logIn";
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
