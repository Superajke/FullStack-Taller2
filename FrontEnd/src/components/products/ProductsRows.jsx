import React from "react";
import { useProduct } from "../../context/ProductContext";
import { useAuth } from "../../context/UserContext";
import { useOrder } from "../../context/OrderContext";
import {
  FaCartPlus,
  FaPencilAlt,
  FaRegTrashAlt,
  FaRetweet,
} from "react-icons/fa";

function ProductsRows({ toggleUpdate, toggleDelete, tableType }) {
  const { user } = useAuth();
  const { products } = useProduct();
  const { addItem } = useOrder();
  tableType = tableType.tableType;

  const productsStock =
    user.role === "USER"
      ? products.filter(
          (product) =>
            product.productStock > 0 && product.active === tableType
        )
      : products.filter((product) => product.active === tableType);

  return (
    <>
      {productsStock.map((product) => (
        <tr key={product.productId}>
          <td>{product.productName}</td>
          <td>{product.productDescription}</td>
          <td>${product.productPrice}</td>
          {user?.role === "ADMIN" && <td>{product.productStock}</td>}
          {user?.role === "USER" && (
            <td
              onClick={() => {
                addItem(product, user.userId);
              }}
              className="table__button"
              style={{ cursor: "pointer", fontSize: "2.5rem" }}
            >
              <FaCartPlus />
            </td>
          )}
          {user?.role === "ADMIN" && (
            <>
              <td
                className="table__button"
                onClick={() => toggleUpdate(product.productId)}
              >
                <FaPencilAlt />
              </td>
              <td
                className="table__button"
                onClick={() =>
                  toggleDelete(product.productId, product.productName)
                }
              >
                {tableType === "ACTIVE" ? <FaRegTrashAlt /> : <FaRetweet />}
              </td>
            </>
          )}
        </tr>
      ))}
    </>
  );
}

export default ProductsRows;
