import React, { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import "../css/Cart.css";
import { useOrder } from "../context/OrderContext";
import { useAuth } from "../context/UserContext";
import { Toaster, toast } from "react-hot-toast";
import CartTable from "./cart/CartTable";

const toastStyle = {
  borderRadius: "10px",
  background: "var(--background-color-dark)",
  color: "var(--primary-color)",
  transform: "scale(-1, 1)",
};

const Cart = () => {
  const [showCart, setShowCart] = useState(false);
  const { cart, createOrder } = useOrder();
  const [previousCartQuantitySum, setPreviousCartQuantitySum] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    const currentCartQuantitySum = cart.filter((item) => item.userId === user.userId)
                                        .reduce((sum, item) => sum + item.quantity, 0);

    if (currentCartQuantitySum > previousCartQuantitySum) {
      toast.success("Producto añadido con éxito", {
        style: toastStyle,
        duration: 1000,
      });
    } else if (currentCartQuantitySum < previousCartQuantitySum) {
      toast.error("Producto eliminado", {
        style: toastStyle,
        duration: 1000,
      });
    }

    setPreviousCartQuantitySum(currentCartQuantitySum);
  }, [cart]);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const items = cart.filter((item) => item.userId === user.userId);

  const buttonClass = `bubble-button__btn ${
    items.length > 0 ? "bubble-button__btn--blink" : "bubble-button__btn"
  }`;

  const handleBuy = async () => {
    const items = cart.filter((item) => item.userId === user.userId);
    const order = {
      userId: user.userId,
      orderDetails: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };
    await createOrder(order);
    setShowCart(false);
  };

  return (
    <section className="bubble-button">
      <Toaster />
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
          {items.length > 0 ? (
            <>
              <CartTable />

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
                  <span style={{ fontWeight: "bold" }}>Total:</span> ${items.reduce((acc, item) => acc + item.productPrice * item.quantity, 0)}
                </p>
              </div>
            </>
          ) : (
            <p>No hay productos en el carrito</p>
          )}
        </section>
      )}
    </section>
  );
};

export default Cart;
