import { useAuth } from "../../context/UserContext";
import OrderRows from "./OrderRows";

function OrdersTable() {
  const { user } = useAuth();
  return (
    <>
      <section className="appointments_content__container">
        <table className="appointments__table">
          <thead>
            <tr>
              <th>Precio Total</th>
              <th>Fecha de compra</th>
              {user?.role === "ADMIN" && <th>Usuario</th>}
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            <OrderRows />
          </tbody>
        </table>
      </section>
    </>
  );
}

export default OrdersTable;
