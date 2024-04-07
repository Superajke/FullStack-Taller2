import React from "react";
import { useOrder } from "../../context/OrderContext";
import { useAuth } from "../../context/UserContext";
import { FaEye, FaPlusCircle } from "react-icons/fa";

function OrderRows() {
  const { orders } = useOrder();
  const { user, users } = useAuth();

  const items =
    user.role === "USER"
      ? orders.filter((order) => order.userId === user.userId)
      : orders;

  const findUser = (userId) => {
    return users.find((user) => user.userId === userId).firstName;
  };

  items.forEach((item) => {
    const date = new Date(item.orderDate);
    const formattedDate = date.toLocaleDateString();
    item.orderDate = formattedDate;
  });

  return (
    <>
      {items.map((product) => (
        <tr key={product.orderId}>
          <td>{product.totalPrice}</td>
          <td>{product.orderDate}</td>
          {user?.role === "ADMIN" && <td>{findUser(product.userId)}</td>}
          <td className="table__button">
            <FaEye />
          </td>
        </tr>
      ))}
    </>
  );
}

export default OrderRows;
