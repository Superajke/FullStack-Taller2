import { Route, Routes } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import LogIn from "../pages/LogIn";
import NotFound from "../components/NotFound";
import Home from "../pages/Home";
import Users from "../pages/Users";
import Products from "../pages/Products";

function RoutesPG() {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      <Route path="/" element={!isAuthenticated ? <LogIn /> : <Home />} />
      <Route path="/users" element={<Users />} />
      <Route path="/products" element={<Products />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RoutesPG;
