import React, { useState } from "react";
import ProductsTable from "../components/products/ProductsTable";
import { FaPlusCircle } from "react-icons/fa";
import UpdateItem from "../components/UptadeItem";

function Products() {
  const [update, setUpdate] = useState(false);
  const toggleUpdate = () => {
    setUpdate(!update);
  };
  return (
    <section className="usuarios">
      <section className="usuarios__container">
        <header className="usuariosTitle__container">
          <h2>Productos</h2>
          <FaPlusCircle className="product__add" onClick={toggleUpdate} />
        </header>
        <ProductsTable />
      </section>
      {update && (
        <UpdateItem item="product" id={""} toggleUpdate={toggleUpdate} />
      )}
    </section>
  );
}

export default Products;
