import { useState } from "react";
import { useOrder } from "../../context/OrderContext";
import { useAuth } from "../../context/UserContext";
import OrderRows from "./OrderRows";
import OrderDetails from "./OrderDetails";

function OrdersTable() {
  const { user } = useAuth();
  const { orders } = useOrder();
  const [showDetails, setShowDetails] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const items =
    user.role === "USER"
      ? orders.filter((order) => order.userId === user.userId)
      : orders;

  const toggleOrderDetails = (id) => {
    setCurrentId(id);
    setShowDetails(!showDetails);
  };
  return (
    <>
      <section className="appointments_content__container">
        {items.length < 1 ? (
          <p style={{ color: "white", fontSize: "2.5rem" }}>
            Todavía no se ha realizado ninguna orden
          </p>
        ) : (
          <table className="appointments__table">
            <thead>
              <tr>
                <th>Fecha de compra</th>
                <th>Precio Total</th>
                {user?.role === "ADMIN" && <th>Usuario</th>}
                <th>Detalles</th>
              </tr>
            </thead>
            <tbody>
              <OrderRows toggleOrderDetails={toggleOrderDetails}/>
            </tbody>
          </table>
        )}
        {showDetails && (
        <OrderDetails
          id={currentId}
          toggleOrderDetails={toggleOrderDetails}
        />
      )}
      </section>
    </>
  );
}

export default OrdersTable;
