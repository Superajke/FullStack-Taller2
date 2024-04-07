import React from "react";
import { useOrder } from "../../context/OrderContext";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useAuth } from "../../context/UserContext";
import { useProduct } from "../../context/ProductContext";
import { Toaster, toast } from "react-hot-toast";

function OrdersRows() {
  const { cart, updateQuantity } = useOrder();
  const { user } = useAuth();
  const { products } = useProduct();
  const items = cart.filter((item) => item.userId === user.userId);

  const findProductStockById = (productId) => {
    const product = products.find((product) => product.productId === productId);
    return product ? product.productStock : 0;
  };

  return (
    <>
      {items.map((product) => (
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
                onClick={() => {
                  if (
                    product.quantity < findProductStockById(product.productId)
                  ) {
                    updateQuantity(product.productId, 1);
                  }
                  else{
                    toast.error("Stock máximo alcanzado", {
                      style: {
                        borderRadius: "10px",
                        background: "var(--background-color-dark)",
                        color: "var(--primary-color)",
                        transform: "scale(-1, 1)",
                      },
                      duration: 1000,
                    })
                  }
                }}
                className={`bubble-button__cart-item__quantity ${
                  product.quantity >= findProductStockById(product.productId)
                    ? "disabled"
                    : ""
                }`}
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
