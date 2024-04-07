import { createContext, useContext, useEffect, useState } from "react";
import { getOrderRequest, postOrderRequest } from "../api/orders.api";
export const OrderContext = createContext();

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within a OrderProvider");
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  const getOrders = async () => {
    try {
      const res = await getOrderRequest();
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createOrder = async (order) => {
    try {
      const res = await postOrderRequest(order);
      getOrders();
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const addItem = (product) => {
    const existingItem = cart.find(
      (item) => item.productId === product.productId
    );
    if (existingItem) {
      updateQuantity(existingItem.productId, 1);
      return;
    }
    const newProduct = {
      productId: product.productId,
      productName: product.productName,
      productPrice: product.productPrice,
      quantity: 1,
    };
    setCart([...cart, newProduct]);
  };

  const updateQuantity = (product, quantity) => {
    setCart(
      cart
        .map((item) =>
          item.productId !== product
            ? item
            : { ...item, quantity: item.quantity + quantity }
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.productPrice * item.quantity,
    0
  );

  useEffect(() => {
    const fetchOrders = async () => {
      await getOrders();
    };
    fetchOrders();
  }, []);

  return (
    <OrderContext.Provider
      value={{
        orders,
        cart,
        total,
        getOrders,
        createOrder,
        addItem,
        updateQuantity,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
