import React from "react";
import { useProduct } from "../../context/ProductContext";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { useAuth } from "../../context/UserContext";

function ProductsRows({ toggleUpdate }) {
  const { user } = useAuth();
  const { products, deleteProduct } = useProduct();

  return (
    <>
      {products.map((product) => (
        <tr key={product.productId}>
          <td>{product.productName}</td>
          <td>{product.productDescription}</td>
          <td>${product.productPrice}</td>
          <td>{product.productStock}</td>
          {user?.role === "ADMIN" && (
            <>
              <td
                style={{ cursor: "pointer" }}
                onClick={() => toggleUpdate(product.productId)}
              >
                <FaPencilAlt />
              </td>
              <td
                style={{ cursor: "pointer" }}
                onClick={() => deleteProduct(product.productId)}
              >
                <FaRegTrashAlt />
              </td>
            </>
          )}
        </tr>
      ))}
    </>
  );
}

export default ProductsRows;
