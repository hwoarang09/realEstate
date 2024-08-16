import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  console.log("isAuthenticated", isAuthenticated);
  if (!isAuthenticated) {
    alert("로그인이 필요합니다.");
    return <Navigate to="/login" />;
  }
  return element;
};

export default PrivateRoute;
