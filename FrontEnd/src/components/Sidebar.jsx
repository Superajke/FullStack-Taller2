import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../css/Sidebar.css";

function Sidebar() {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const onClick = () => {
    logOut();
    navigate("/");
  };

  return (
    <section className="sidebar">
      <h1 className="sidebar__title">
        Taller 2
      </h1>
      <ul>
        <li
          className="sidebar__li"
          onClick={() => {
            navigate("/");
          }}
        >
          Inicio
        </li>
        <li
          className="sidebar__li"
          onClick={() => {
            navigate("/users");
          }}
        >
          Usuarios
        </li>
      </ul>
      <h1 className="sidebar__bottom" onClick={onClick}>
        Sign Out
      </h1>
    </section>
  );
}

export default Sidebar;
