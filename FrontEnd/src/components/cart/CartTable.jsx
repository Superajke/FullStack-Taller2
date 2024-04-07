import React, { useState } from "react";
import CartRows from "./CartRows";

function CartTable() {
  return (
    <>
      <section>
        <table className="orders_table">
          <thead>
            <tr>
              <th>Productos</th>
              <th>Cantidad</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            <CartRows />
          </tbody>
        </table>
      </section>
    </>
  );
}

export default CartTable;
