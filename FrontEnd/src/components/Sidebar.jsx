import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../css/Sidebar.css";

function Sidebar() {
  const { logOut, user } = useAuth();
  const navigate = useNavigate();
  const onClick = () => {
    logOut();
    navigate("/");
  };

  return (
    <section className="sidebar">
      <h1 className="sidebar__title">Tienda</h1>
      {user.role === "ADMIN" && <p style={{marginBottom: "1rem"}}>{user.role}</p>}
      <ul>
        <li
          className="sidebar__li"
          onClick={() => {
            navigate("/");
          }}
        >
          Inicio
        </li>
        {user.role == "ADMIN" && (
          <li
            className="sidebar__li"
            onClick={() => {
              navigate("/users");
            }}
          >
            Usuarios
          </li>
        )}
        <li
          className="sidebar__li"
          onClick={() => {
            navigate("/products");
          }}
        >
          Productos
        </li>
        <li
          className="sidebar__li"
          onClick={() => {
            navigate("/orders");
          }}
        >
          Órdenes
        </li>
      </ul>
      <h1 className="sidebar__bottom" onClick={onClick}>
        Cerrar Sesion
      </h1>
    </section>
  );
}

export default Sidebar;
