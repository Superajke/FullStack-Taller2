import React from "react";
import { useOrder } from "../../context/OrderContext";
import { FaMinus, FaPlus } from "react-icons/fa";

function OrdersRows() {
  const { cart, updateQuantity } = useOrder();

  return (
    <>
      {cart.map((product) => (
        <tr key={product.productId}>
          <td>{product.productName}</td>
          <td>{product.quantity}</td>
          <td>${product.productPrice * product.quantity}</td>
          <td>
            <div className="quantity-controls">
              <div
                onClick={() => updateQuantity(product.productId, -1)}
                className="bubble-button__cart-item__quantity"
              >
                <FaMinus name="minus" />
              </div>
              <div
                onClick={() => updateQuantity(product.productId, 1)}
                className="bubble-button__cart-item__quantity"
              >
                <FaPlus name="plus" />
              </div>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}

export default OrdersRows;
