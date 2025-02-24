import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
// implements login persistence
  const token = localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
