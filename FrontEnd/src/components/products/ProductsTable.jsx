import React, { useState } from "react";
import ProductsRows from "./ProductsRows";
import UpdateItem from "../UptadeItem";
import { useAuth } from "../../context/UserContext";
import DeleteItem from "../DeleteItem";
import { useProduct } from "../../context/ProductContext";

function ProductsTable(tableType) {
  const { user } = useAuth();
  const [update, setUpdate] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [deleter, setDeleter] = useState(false);
  const [item, setItem] = useState(null);
  const { products } = useProduct();
  const tableTy = tableType.tableType;

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
        {user.role === "USER" &&
        products.every(
          (product) => product.active === "INACTIVE" || product.productStock < 1
        ) ? (
          <p style={{ color: "white", fontSize: "2.5rem" }}>
            No hay productos en stock
          </p>
        ) : (
          <table className="appointments__table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                {user?.role === "ADMIN" && <th>Stock</th>}
                {user?.role === "USER" && <th>Añadir</th>}
                {user?.role === "ADMIN" && <th>Editar</th>}
                {user?.role === "ADMIN" && (
                  <th>{tableTy === "ACTIVE" ? "Eliminar" : "Restaurar"}</th>
                )}
              </tr>
            </thead>
            <tbody>
              <ProductsRows
                toggleUpdate={toggleUpdate}
                toggleDelete={toggleDelete}
                tableType={tableType}
              />
            </tbody>
          </table>
        )}
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
          tableType={tableTy}
        />
      )}
    </>
  );
}

export default ProductsTable;
