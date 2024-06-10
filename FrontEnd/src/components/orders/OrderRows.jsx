import React from "react";
import { useOrder } from "../../context/OrderContext";
import { useAuth } from "../../context/UserContext";
import { FaEye } from "react-icons/fa";

function OrderRows({toggleOrderDetails}) {
  const { orders } = useOrder();
  const { user, users } = useAuth();

  const items =
    user.role === "CLIENTE"
      ? orders.filter((order) => order.userId === user.userId)
      : orders;

  const findUser = (userId) => {
    return `${users.find((user) => user.userId === userId).firstName} ${users.find((user) => user.userId === userId).lastName}`;
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  }

  return (
    <>
      {items.map((order) => (
        <tr key={order.orderId}>
          <td>{formatDate(order.orderDate)}</td>
          <td>${order.totalPrice}</td>
          {user?.role === "ADMIN" && <td>{findUser(order.userId)}</td>}
          <td className="table__button" onClick={()=> toggleOrderDetails(order.orderId)}>
            <FaEye />
          </td>
        </tr>
      ))}
    </>
  );
}

export default OrderRows;
