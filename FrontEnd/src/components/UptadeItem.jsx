import React, { useEffect, useState } from "react";
import "../css/Update.css";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/UserContext";
import { useProduct } from "../context/ProductContext";

function UptadeItem({ item, id, toggleUpdate }) {
  const { register, handleSubmit, setValue } = useForm();
  const { users, updateUser } = useAuth();
  const { products, createUpdateProduct } = useProduct();
  const [button, setButton] = useState(true);

  const foundItem =
    "product" === item
      ? products.find((product) => product.productId === id)
      : users.find((user) => user.userId === id);

  useEffect(() => {
    if (foundItem) {
      if (item === "product") {
        setValue("productName", foundItem.productName);
        setValue("productDescription", foundItem.productDescription);
        setValue("productPrice", foundItem.productPrice);
        setValue("productStock", foundItem.productStock);
      } else if (item === "user") {
        setValue("firstName", foundItem.firstName);
        setValue("lastName", foundItem.lastName);
        setValue("email", foundItem.email);
        setValue("role", foundItem.role);
      }
    }
  }, []);

  const onSubmitProduct = handleSubmit(async (data) => {
    setButton(false);
    if (id) {
      data.productId = id;
    }
    await createUpdateProduct(data);
    setTimeout(() => {
      toggleUpdate(0);
    }, 800);
  });
  const onSubmitUser = handleSubmit(async (data) => {
    setButton(false);
    if (id) {
      data.userId = id;
    }
    await updateUser(data);
    setTimeout(() => {
      toggleUpdate(0);
    }, 800);
  });

  return (
    <section>
      <section className="backdrop" onClick={() => toggleUpdate(0)}></section>
      <section className="update">
        {item === "product" && (
          <form onSubmit={onSubmitProduct} className="update__form">
            <section className="update__inputs">
              <div>
                <p>Nombre</p>

                <input
                  type="text"
                  {...register("productName")}
                  readOnly={id === "" ? false : true}
                />
              </div>
              <div>
                <p>Descripción</p>
                <input type="text" {...register("productDescription")} />
              </div>
              <div>
                <p>Precio</p>
                <input type="number" {...register("productPrice")} />
              </div>
              <div>
                <p>Stock</p>
                <input type="number" {...register("productStock")} />
              </div>
            </section>

            <section className="update__button">
              {button ? (
                <button type="submit" className="submit_button">
                  {id === "" ? "Crear" : "Actualizar"}
                </button>
              ) : (
                <p className="submit__text">
                  {id === "" ? "Creando..." : "Actualizando..."}
                </p>
              )}
              <button className="submit_button" onClick={() => toggleUpdate(0)}>
                Cancelar
              </button>
            </section>
          </form>
        )}
        {item === "user" && (
          <form onSubmit={onSubmitUser} className="update__form">
            <section className="update__inputs">
              <div>
                <p>Nombre</p>
                <input type="text" {...register("firstName")} />
              </div>
              <div>
                <p>Apellido</p>
                <input type="text" {...register("lastName")} />
              </div>
              <div>
                <p>Correo Eléctronico</p>
                <input type="text" {...register("email")} />
              </div>
              <div>
                <p>Rol</p>
                <select
                  className="register__form-select"
                  type="text"
                  {...register("role")}
                >
                  <option value="" disabled hidden>
                    Rol
                  </option>
                  <option value="ADMIN">Admin</option>
                  <option value="ADMIN_CLIENTES">Admin Clientes</option>
                  <option value="ADMIN_PRODUCTO">Admin Producto</option>
                  <option value="CLIENTE">Clientes</option>
                </select>
              </div>
            </section>

            <section className="update__button">
              {button ? (
                <button type="submit" className="submit_button">
                  {id === "" ? "Crear" : "Actualizar"}
                </button>
              ) : (
                <p className="submit__text">
                  {id === "" ? "Creando..." : "Actualizando..."}
                </p>
              )}
              <button className="submit_button" onClick={() => toggleUpdate(0)}>
                Cancelar
              </button>
            </section>
          </form>
        )}
      </section>
    </section>
  );
}

export default UptadeItem;
