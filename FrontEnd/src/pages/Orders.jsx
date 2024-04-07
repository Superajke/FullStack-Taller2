import React from "react";
import { useOrder } from "../context/OrderContext";
import OrdersTable from "../components/orders/OrdersTable";

function Orders() {
  return (
    <section className="usuarios">
      <section className="usuarios__container">
        <header className="usuariosTitle__container">
          <h2>Órdenes</h2>
        </header>
        <OrdersTable />
      </section>
    </section>
  );
}

export default Orders;
