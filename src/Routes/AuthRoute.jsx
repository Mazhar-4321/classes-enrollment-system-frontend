import { Outlet, Navigate } from "react-router-dom";
import React from "react";

const AuthRoute = ({ children }) => {
  // const [loggedIn, setLogggedIn] = React.useState(false);
  if (localStorage.getItem("token")) {
     <Navigate to="/CourseDetail" />;
  }
  return children;
};

export default AuthRoute;