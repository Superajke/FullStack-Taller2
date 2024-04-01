import axios from "./axios";

export const loginUserRequest = async (user) => {
  return await axios.post("http://localhost:3000/login", user, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createUserRequest = async (user) => {
  return await axios.post(`http://localhost:3000/api/v1/user`, user);
};

export const logOutRequest = async () =>
  await axios.post(
    `http://localhost:3000/logout`,
    {},
    {
      withCredentials: true,
    }
  );

export const verifyTokenRequest = async () => {
  return await axios.post(
    "http://localhost:3000/api/v1/user/verifyToken",
    {},
    {
      withCredentials: true,
    }
  );
};
