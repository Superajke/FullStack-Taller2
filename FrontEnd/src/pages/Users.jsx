import React from "react";
import UsersTable from "../components/users/UsersTable";
import "../css/Usuarios.css";
import { useAuth } from "../context/UserContext";

function Users() {
  const { user } = useAuth();
  return (
    <section className="usuarios">
      <section className="usuarios__container">
        <header className="usuariosTitle__container">
          <h2>Usuarios</h2>
        </header>
        <UsersTable tableType={"ACTIVE"}/>
        {(user?.role === "ADMIN" || user?.role === "ADMIN_CLIENTES") && (
          <>
            <br />
            <header className="usuariosTitle__container">
              <h2>Productos Inactivos</h2>
            </header>
            <UsersTable tableType={"INACTIVE"} />
          </>
        )}
      </section>
    </section>
  );
}

export default Users;
