import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/app/hooks";
import { authSelector } from "../redux/features/auth/authSelector";

const SemiProtectedRoute = () => {
  const { user, isAuthenticated } = useAppSelector(authSelector);

  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to={"/"} state={{ from: location }} replace />;
  }
  return user._id && !user.activated ? (
    <Outlet />
  ) : (
    <Navigate to={"/room"} state={{ from: location }} replace />
  );
};

export default SemiProtectedRoute;
