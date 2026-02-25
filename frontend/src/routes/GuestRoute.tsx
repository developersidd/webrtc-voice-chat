import { Navigate, Outlet, useLocation } from "react-router-dom";

const GuestRoute = () => {
  const user = null;
  const location = useLocation();
  if (user) {
    return <Navigate to={"/room"} state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default GuestRoute;
