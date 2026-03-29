import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Loader from "./components/ui/Loader";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Activate from "./pages/activate/Activate";
import Authenticate from "./pages/authenticate/Authenticate";
import NotFound from "./pages/not-found/NotFound";
import { useRefreshAccessTokenQuery } from "./redux/features/auth/authApi";
import GuestRoute from "./routes/GuestRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import SemiProtectedRoute from "./routes/SemiProtectedRoute";

const App = () => {
  const { isLoading, isSuccess, isError, data } = useRefreshAccessTokenQuery(
    {},
    {
      //skip: true,
    },
  );
  console.log("🚀 ~ data:", data);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-16" />
      </div>
    );
  }
  return (
    <Router>
      <Navbar />
      <Routes>
        {/*<Route path="/register" element={<Register />} />*/}
        {/*<Route path="/authenticate" element={<Authenticate />} />*/}
        <Route element={<GuestRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/authenticate" element={<Authenticate />} />
        </Route>
        <Route element={<SemiProtectedRoute />}>
          <Route path="/activate" element={<Activate />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/room" element={<Rooms />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
