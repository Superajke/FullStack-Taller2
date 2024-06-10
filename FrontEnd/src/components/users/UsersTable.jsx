import { useState } from "react";
import UsersRows from "./UsersRows";
import UpdateItem from "../UptadeItem";
import DeleteItem from "../DeleteItem";
import { useAuth } from "../../context/UserContext";

function UsersTable(tableType) {
  const [update, setUpdate] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [deleter, setDeleter] = useState(false);
  const [item, setItem] = useState(null);
  const { user } = useAuth();
  const toggleUpdate = (id) => {
    setCurrentId(id);
    setUpdate(!update);
  };
  const toggleDelete = (id, item) => {
    setCurrentId(id);
    setDeleter(!deleter);
    setItem(item);
  };
  const tableTy = tableType.tableType;
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
              {(user?.role === "ADMIN" || user?.role === "ADMIN_CLIENTES") && (
                <th>{tableTy === "ACTIVE" ? "Eliminar" : "Activar"}</th>
              )}
            </tr>
          </thead>
          <tbody>
            <UsersRows
              toggleUpdate={toggleUpdate}
              toggleDelete={toggleDelete}
              tableType={tableType}
            />
          </tbody>
        </table>
      </section>
      {update && (
        <UpdateItem item="user" id={currentId} toggleUpdate={toggleUpdate} />
      )}
      {deleter && (
        <DeleteItem
          type="user"
          item={item}
          id={currentId}
          toggleDelete={toggleDelete}
          tableType={tableTy}
        />
      )}
    </>
  );
}

export default UsersTable;
