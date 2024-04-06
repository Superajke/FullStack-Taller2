import axios from "axios";

const postOrderRequest = async (order) =>
  await axios.post("http://localhost:3000/api/v1/order", order);
