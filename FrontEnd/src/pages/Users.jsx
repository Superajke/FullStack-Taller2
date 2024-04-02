import React from "react";
import UsersTable from "../components/users/UsersTable";
import "../css/Usuarios.css";

function Users() {
  return (
    <section className="usuarios">
      <section className="usuarios__container">
      <header className="usuariosTitle__container">
          <h2>Usuarios</h2>
        </header>
      <UsersTable />;
      </section>
    </section>
  );
}

export default Users;
