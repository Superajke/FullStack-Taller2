import React, { useState } from "react";
import OrdersRows from "./OrdersRows";

function OrdersTable() {
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
            <OrdersRows />
          </tbody>
        </table>
      </section>
    </>
  );
}

export default OrdersTable;
