import { useState } from "react";
import UsersRows from "./UsersRows";
import UpdateItem from "../UptadeItem";

function UsersTable() {
  const [update, setUpdate] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const toggleUpdate = (id) => {
    setCurrentId(id);
    setUpdate(!update);
  };
  return (
    <>
      <section className="appointments_content__container">
        <table className="appointments__table">
          <thead>
            <tr>
              <th>Nombre Completo</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <UsersRows toggleUpdate={toggleUpdate} />
          </tbody>
        </table>
      </section>
      {update && (
        <UpdateItem item="user" id={currentId} toggleUpdate={toggleUpdate} />
      )}
    </>
  );
}

export default UsersTable;
