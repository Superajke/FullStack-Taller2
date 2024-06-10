import { Route, Routes } from "react-router-dom";
import { useAuth } from "../context/UserContext";
import LogIn from "../pages/LogIn";
import NotFound from "../components/NotFound";
import Home from "../pages/Home";
import Users from "../pages/Users";
import Products from "../pages/Products";
import ProtectedRoute from "../ProtectedRoute";
import Orders from "../pages/Orders";

function RoutesPG() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/login" element={<LogIn />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />}></Route>
        <Route
          path="/users"
          element={
            !(user?.role !== "ADMIN" || user?.role !== "ADMIN_CLIENTES") ? (
              <Home />
            ) : (
              <Users />
            )
          }
        />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default RoutesPG;
