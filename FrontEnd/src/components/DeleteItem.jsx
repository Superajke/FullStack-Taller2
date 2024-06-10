import React, { useState } from "react";
import { useProduct } from "../context/ProductContext";
import { useAuth } from "../context/UserContext";

function DeleteItem({ item, id, type, toggleDelete, tableType }) {
  const { deleteProduct } = useProduct();
  const { deleteUser } = useAuth();
  const [deleting, setDeleteing] = useState(false);

  const deleteProducts = async (id) => {
    setDeleteing(true);
    await deleteProduct(id);
    setTimeout(() => {
      toggleDelete(0);
    }, 1500);
  };

  const deleteUsers = async (id) => {
    setDeleteing(true);
    await deleteUser(id);
    setTimeout(() => {
      toggleDelete(0);
    }, 1500);
  };
  const tableTy = tableType === "ACTIVE" ? "Eliminar" : "Activar";

  return (
    <section>
      <section className="backdrop" onClick={() => toggleDelete(0)}></section>
      <section className="update">
        {type === "product" ? (
          <section className="delete__section">
            <h2>Estás seguro que deseas {tableTy} el Product: </h2>
            <p
              style={{
                color: "var(--primary-color)",
                fontSize: "2rem",
                paddingTop: "1rem",
              }}
            >
              {item}
            </p>

            {deleting ? (
              <p className="submit__text">Procesando...</p>
            ) : (
              <button
                className="submit_button"
                onClick={() => deleteProducts(id)}
              >
                {tableTy}
              </button>
            )}
            <button className="submit_button" onClick={() => toggleDelete(0)}>
              Cancelar
            </button>
          </section>
        ) : (
          <section className="delete__section">
            <h2>Estás seguro que deseas {tableTy} el Usuario: </h2>
            <p
              style={{
                color: "var(--primary-color)",
                fontSize: "2rem",
                paddingTop: "1rem",
              }}
            >
              {item}
            </p>
            {deleting ? (
              <p className="submit__text">Procesando...</p>
            ) : (
              <button className="submit_button" onClick={() => deleteUsers(id)}>
                {tableTy}
              </button>
            )}
            <button className="submit_button" onClick={() => toggleDelete(0)}>
              Cancelar
            </button>
          </section>
        )}
      </section>
    </section>
  );
}

export default DeleteItem;
