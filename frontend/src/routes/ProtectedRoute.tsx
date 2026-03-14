import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/app/hooks";
import { authSelector } from "../redux/features/auth/authSelector";

const ProtectedRoute = () => {
  const { user, isAuthenticated } = useAppSelector(authSelector);

  const location = useLocation();
  if (isAuthenticated && !user.activated) {
    return <Navigate to={"/activate"} state={{ from: location }} replace />;
  }
  return !isAuthenticated ? (
    <Navigate to={"/"} state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoute;
