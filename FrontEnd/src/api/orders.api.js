import axios from "axios";

export const getOrderRequest = async () =>
  await axios.get("http://localhost:3000/api/v1/order");

export const postOrderRequest = async (order) =>
  await axios.post("http://localhost:3000/api/v1/order", order);
