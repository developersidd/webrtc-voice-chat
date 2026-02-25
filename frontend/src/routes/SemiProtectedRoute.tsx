import { Navigate, Outlet, useLocation } from "react-router-dom";

const SemiProtectedRoute = () => {
  const user = {
    activated: false,
  };
  const location = useLocation();
  if (!user) {
    return <Navigate to={"/"} state={{ from: location }} replace />;
  }
  return user && !user?.activated ? (
    <Outlet />
  ) : (
    <Navigate to={"/rooms"} state={{ from: location }} replace />
  );
};

export default SemiProtectedRoute;
