import React from "react";
import { useProduct } from "../../context/ProductContext";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";

function ProductsRows({ toggleUpdate }) {
  const { products, deleteUser } = useProduct(); // Asume que `deleteUser` viene de `useProduct`

  return (
    <>
      {products.map((product) => (
        <tr key={product.productId}>
          <td>{product.productName}</td>
          <td>{product.productDescription}</td>
          <td>${product.productPrice}</td>
          <td>{product.productStock}</td>
          <td
            style={{ cursor: "pointer" }}
            onClick={() => toggleUpdate(product.productId)}
          >
            <FaPencilAlt />
          </td>
          <td
            style={{ cursor: "pointer" }}
            onClick={() => deleteUser(product.productId)}
          >
            <FaRegTrashAlt />
          </td>
        </tr>
      ))}
    </>
  );
}

export default ProductsRows;
