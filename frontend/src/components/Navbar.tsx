import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { useLogoutMutation } from "../redux/features/auth/authApi";
import { authSelector } from "../redux/features/auth/authSelector";
import { setAuth } from "../redux/features/auth/authSlice";
import Button from "./ui/Button";
import logo from "/logo.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { user } = useAppSelector(authSelector);
  const [logoutUser, { isLoading, error, data }] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const logout = async () => {
    try {
      const res =  await logoutUser().unwrap();
      dispatch(setAuth(res?.data));
    } catch (error) {
      toast.error("Error while logging out!");
      console.error("Error while logging out!", error);
    }
  };

  return (
    <header className="bg-primary container mx-auto py-5 px-4 sm:px-2 flex items-center justify-between "> 
      <div className="flex items-center ">
        <img
          className="w-7 h-6.5 lg:w-[37.65px] lg:h-7.5 mr-2 lg:mr-3"
          src={logo}
          alt="logo"
          width={50}
          height={50}
        />
        <h1 className="text-white font-bold text-xl lg:text-2xl"> SiddikHouse</h1>
      </div>
      {user?._id && (
        <div className="flex gap-4 items-center justify-center">
          <h3 className="text-white"> {user.fullName} </h3>
          <Link to="/">
          <img className="size-13 rounded-full border-[3px] border-blue" src={user.avatar} alt={user.fullName} />
          </Link>
          <Button
          className="hidden sm:flex"
            disabled={isLoading}
            icon={<LogOut size={21} />}
            label="Logout"
            onClick={logout}
          />
        </div>
      )}
    </header>
  );
};

export default Navbar;
