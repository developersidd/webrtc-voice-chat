import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated = false;
  const user = {
    activated: false,
  };
  const location = useLocation();
  if (isAuthenticated && !user?.activated) {
    return <Navigate to={"/activate"} state={{ from: location }} replace />;
  }
  return !isAuthenticated ? (
    <Navigate to={"/"} state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoute;
