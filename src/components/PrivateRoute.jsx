import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

function PrivateRoute() {
  const { user } = useAuthContext();

  return user ? <Outlet /> : <Navigate to="/signup" />;
}

export default PrivateRoute;
