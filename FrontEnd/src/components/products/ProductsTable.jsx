import React, { useState } from "react";
import ProductsRows from "./ProductsRows";
import UpdateItem from "../UptadeItem";
import { useAuth } from "../../context/UserContext";

function ProductsTable() {
  const { user } = useAuth();
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
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              {user?.role === "ADMIN" && <th>Editar</th>}
              {user?.role === "ADMIN" && <th>Eliminar</th>}
            </tr>
          </thead>
          <tbody>
            <ProductsRows toggleUpdate={toggleUpdate} />
          </tbody>
        </table>
      </section>
      {update && (
        <UpdateItem item="product" id={currentId} toggleUpdate={toggleUpdate} />
      )}
    </>
  );
}

export default ProductsTable;
