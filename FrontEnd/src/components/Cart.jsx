import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import "../css/Cart.css";
import OrdersTable from "./orders/OrdersTable";
import { useOrder } from "../context/OrderContext";
import { useAuth } from "../context/UserContext";

const Cart = () => {
  const [showCart, setShowCart] = useState(false);
  const { cart, total, createOrder } = useOrder();
  const { user } = useAuth();

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const buttonClass = `bubble-button__btn ${
    cart.length > 0 ? "bubble-button__btn--blink" : "bubble-button__btn"
  }`;

  const handleBuy = async () => {
    const order = {
      userId: user.userId,
      orderDetails: cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };
    await createOrder(order);
    setShowCart(false);
  };

  return (
    <section className="bubble-button">
      <section
        className={showCart ? "backdrop" : ""}
        onClick={toggleCart}
      ></section>
      <button onClick={toggleCart} className={buttonClass}>
        <FaCartPlus />
      </button>
      {showCart && (
        <section
          className="bubble-button__cart-info"
          style={{ display: showCart ? "block" : "none" }}
        >
          <OrdersTable />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "0.75rem",
            }}
          >
            <button
              style={{
                backgroundColor: "var(--secondary-color)",
                color: "white",
                margin: "0rem",
              }}
              onClick={handleBuy}
              className="submit_button"
            >
              Comprar
            </button>
            <p style={{ fontSize: "2rem" }}>
              {" "}
              <span style={{ fontWeight: "bold" }}>Total:</span> ${total}
            </p>
          </div>
        </section>
      )}
    </section>
  );
};

export default Cart;
