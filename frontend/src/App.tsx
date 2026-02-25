import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Activate from "./pages/activate/Activate";
import Authenticate from "./pages/authenticate/Authenticate";
import NotFound from "./pages/not-found/NotFound";
import GuestRoute from "./routes/GuestRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import SemiProtectedRoute from "./routes/SemiProtectedRoute";

const App = () => {
  return (
    <>
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
          <Route path="/rooms" element={<Rooms />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
