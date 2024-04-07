import React, { useState } from "react";
import ProductsRows from "./ProductsRows";
import UpdateItem from "../UptadeItem";
import { useAuth } from "../../context/UserContext";
import DeleteItem from "../DeleteItem";

function ProductsTable() {
  const { user } = useAuth();
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
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              {user?.role === "ADMIN" && <th>Stock</th>}
              {user?.role === "USER" && <th>Añadir</th>}
              {user?.role === "ADMIN" && <th>Editar</th>}
              {user?.role === "ADMIN" && <th>Eliminar</th>}
            </tr>
          </thead>
          <tbody>
            <ProductsRows
              toggleUpdate={toggleUpdate}
              toggleDelete={toggleDelete}
            />
          </tbody>
        </table>
      </section>
      {update && (
        <UpdateItem item="product" id={currentId} toggleUpdate={toggleUpdate} />
      )}
      {deleter && (
        <DeleteItem
          type="product"
          item={item}
          id={currentId}
          toggleDelete={toggleDelete}
        />
      )}
    </>
  );
}

export default ProductsTable;
