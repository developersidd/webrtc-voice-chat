import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/app/hooks";
import { authSelector } from "../redux/features/auth/authSelector";

const GuestRoute = () => {
  const { user } = useAppSelector(authSelector);

  const location = useLocation();
  if (user?.id) {
    return <Navigate to={"/rooms"} state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default GuestRoute;
