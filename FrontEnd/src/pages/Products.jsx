import React, { useState } from "react";
import ProductsTable from "../components/products/ProductsTable";
import { FaPlusCircle } from "react-icons/fa";
import UpdateItem from "../components/UptadeItem";
import { useAuth } from "../context/UserContext";

function Products() {
  const { user } = useAuth();
  const [update, setUpdate] = useState(false);
  const toggleUpdate = () => {
    setUpdate(!update);
  };
  return (
    <section className="usuarios">
      <section className="usuarios__container">
        <header className="usuariosTitle__container">
          <h2>Productos</h2>
          {(user?.role === "ADMIN" || user?.role === "ADMIN_PRODUCTO") && (
            <FaPlusCircle className="product__add" onClick={toggleUpdate} />
          )}
        </header>
        <ProductsTable tableType={"ACTIVE"} />
        {(user?.role === "ADMIN" || user?.role === "ADMIN_PRODUCTO") && (
          <>
            <br />
            <header className="usuariosTitle__container">
              <h2>Productos Inactivos</h2>
            </header>
            <ProductsTable tableType={"INACTIVE"} />
          </>
        )}
      </section>
      {update && (
        <UpdateItem item="product" id={""} toggleUpdate={toggleUpdate} />
      )}
    </section>
  );
}

export default Products;
