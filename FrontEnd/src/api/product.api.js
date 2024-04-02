import axios from "axios";

export const getProductsRequest = async () =>
  await axios.get("http://localhost:3000/api/v1/product");

export const getProductByIdRequest = async (id) =>
  await axios.get(`http://localhost:3000/api/v1/product/${id}`);

export const createProductRequest = async (product) =>
  await axios.post("http://localhost:3000/api/v1/product", product);

export const deleteProductRequest = async (id) =>
  await axios.delete(`http://localhost:3000/api/v1/product/${id}`);
