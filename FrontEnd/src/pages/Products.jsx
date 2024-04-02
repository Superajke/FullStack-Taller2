import React from "react";
import ProductsTable from "../components/products/ProductsTable";

function Products() {
  return (
    <section className="usuarios">
      <section className="usuarios__container">
        <header className="usuariosTitle__container">
          <h2>Productos</h2>
        </header>
        <ProductsTable />
      </section>
    </section>
  );
}

export default Products;
