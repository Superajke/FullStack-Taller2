import { useState } from "react";
import UsersRows from "./UsersRows";
import UpdateItem from "../UptadeItem";
import DeleteItem from "../DeleteItem";

function UsersTable() {
  const [update, setUpdate] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [deleter, setDeleter] = useState(false);
  const [item, setItem] = useState(null);
  const toggleUpdate = (id) => {
    setCurrentId(id);
    setUpdate(!update);
  };
  const toggleDelete = (id, item) => {
    setCurrentId(id);
    setDeleter(!deleter);
    setItem(item);
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
            <UsersRows
              toggleUpdate={toggleUpdate}
              toggleDelete={toggleDelete}
            />
          </tbody>
        </table>
      </section>
      {update && (
        <UpdateItem item="user" id={currentId} toggleUpdate={toggleUpdate} />
      )}
      {deleter && (
        <DeleteItem type="user" item={item}  id={currentId} toggleDelete={toggleDelete} />
      )}
    </>
  );
}

export default UsersTable;
