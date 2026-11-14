import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // Check if user is logged in
  if (!token || token === "null" || token === "undefined") {
    return <Navigate to="/login" replace />;
  }

  // Check if user is an admin
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;