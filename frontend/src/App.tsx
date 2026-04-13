import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CardLoader from "./components/ui/CardLoader";
import Activate from "./pages/activate/Activate";
import Authenticate from "./pages/authenticate/Authenticate";
import Home from "./pages/Home/HomePage";
import NotFound from "./pages/not-found/NotFound";
import Rooms from "./pages/Rooms/RoomsPage";
import SingleRoom from "./pages/SingleRoom/SingleRoomPage";
import { useRefreshAccessTokenQuery } from "./redux/features/auth/authApi";
import GuestRoute from "./routes/GuestRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import SemiProtectedRoute from "./routes/SemiProtectedRoute";
const App = () => {
  const isLoggedIn = localStorage.getItem("loggedIn") as string;
  const { isLoading, isSuccess, isError, data } = useRefreshAccessTokenQuery(
    undefined,
    {
      skip: !JSON.parse(isLoggedIn),
    },
  );
  console.log("🚀 ~ data:", data);
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <CardLoader className="mt-0" text="Loading, please wait..." />
      </div>
    );
  }
  return (
    <Router>
      <Navbar />
      <Routes>
        {/*<Route path="/register" element={<Register />} />*/}
        {/*<Route path="/authenticate" element={<Authenticate />} />*/}
        {/* Guest routes */}
        <Route element={<GuestRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/authenticate" element={<Authenticate />} />
        </Route>
        {/* Semi-protected routes */}
        <Route element={<SemiProtectedRoute />}>
          <Route path="/activate" element={<Activate />} />
        </Route>
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/room/:id" element={<SingleRoom />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
