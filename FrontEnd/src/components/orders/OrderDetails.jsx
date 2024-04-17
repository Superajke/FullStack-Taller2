import { useAuth } from "../../context/UserContext";
import { useOrder } from "../../context/OrderContext";
import { useProduct } from "../../context/ProductContext";

function OrderDetails({ id, toggleOrderDetails }) {
  const { orders } = useOrder();
  const { user } = useAuth();
  const { products } = useProduct();

  const order = orders.find(
    (order) =>
      order.orderId === id &&
      (user.role === "USER" ? order.userId === user.userId : true)
  );

  const productFinder = (productId) => {
    return products.find((product) => product.productId === productId)
      .productName;
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    return `${newDate.getDate()}/${
      newDate.getMonth() + 1
    }/${newDate.getFullYear()}`;
  }
  return (
    <section>
      <section
        className="backdrop"
        onClick={() => toggleOrderDetails(0)}
      ></section>
      <section className="update">
        <header className="usuariosTitle__container--mod">
          <h2>Detalles de la orden</h2>
          <p>
            <span style={{ color: "var(--primary-color)" }}>
              Fecha de compra:
            </span>{" "}
            {formatDate(order.orderDate)}
          </p>
          <p>
            <span style={{ color: "var(--primary-color)" }}>Precio total:</span>{" "}
            ${order.totalPrice}
          </p>
        </header>
        <table className="appointments__table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio unitario</th>
              <th>Precio Total</th>
            </tr>
          </thead>
          <tbody>
            {order.orderDetails &&
              order.orderDetails.map((detail, index) => (
                <tr key={index}>
                  <td>{productFinder(detail.productId)}</td>
                  <td>{detail.quantity}</td>
                  <td>${detail.price/detail.quantity}</td>
                  <td>${detail.price}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <button className="submit_button" onClick={() => toggleOrderDetails(0)}>
          Cerrar
        </button>
      </section>
    </section>
  );
}

export default OrderDetails;
