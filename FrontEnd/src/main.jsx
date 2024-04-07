import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./css/index.css";
import { AuthProvider } from "./context/UserContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext.jsx";
import { OrderProvider } from "./context/OrderContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ProductProvider>
        <OrderProvider>
          <App />
        </OrderProvider>
      </ProductProvider>
    </AuthProvider>
  </BrowserRouter>
);
