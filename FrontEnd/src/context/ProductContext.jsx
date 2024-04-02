import { createContext, useContext, useEffect, useState } from "react";
import {
  getProductsRequest,
  createUpdateProductRequest,
  deleteProductRequest,
} from "../api/product.api";
export const ProductContext = createContext();

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await getProductsRequest();
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createUpdateProduct = async (product) => {
    try {
      const res = await createUpdateProductRequest(product);
      getProducts();
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteProductRequest(id);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      await getProducts();
    };
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, getProducts, createUpdateProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};
