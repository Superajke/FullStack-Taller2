import { useForm } from "react-hook-form";
import "../css/Register.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../context/UserContext";
import { useState } from "react";

const Register = ({ showLoginForm }) => {
  const { signUp } = useAuth();
  const [state, setState] = useState(1);
  const {
    register,
    handleSubmit,
  } = useForm();


  const onBar = () => {
    showLoginForm();
  };


  const changeStateForward = () => {
    if (state == 1) {
      setState(2);
    } 
  };

  const changeStateBackwards = () => {
    if (state == 2) {
      setState(1);
    } 
  };

  const onSubmit = handleSubmit((data) => {
    let isValid = true;
    if (data.password !== data.user_password_confirm) {
      alert("Passwords do not match");
      isValid = false;
    }
    console.log(data)
    delete data.user_password_confirm;
    if (isValid) {
      signUp(data);
    }
  });

  return (
    <section className="register">
      <form onSubmit={onSubmit} className="register__form">
        <section className="login__bars">
          <div className="login__bar" onClick={onBar}></div>
          <div className="login__bar--modifier"></div>
        </section>

        <section
          className={state == 1 ? "register__active" : "register__hidden"}
        >
          {state == 1 && (
            <section className="register__personal">
              <h1>Información Personal</h1>
              <section className="register__inputs">
                <input
                  type="text"
                  {...register("firstName", { required: true })}
                  placeholder="Nombre"
                />

                <input
                  type="text"
                  {...register("lastName", { required: true })}
                  placeholder="Apellido"
                />

              </section>
            </section>
          )}
        </section>

        <section
          className={state == 2 ? "register__active" : "register__hidden"}
        >
          {state == 2 && (
            <section className="register__user">
              <h1>Información de Usuario</h1>
              <input
                className="register__input"
                type="text"
                {...register("email", { required: true })}
                placeholder="Correo Electrónico"
              />

              <section className="register__inputs">

                <input
                  type="password"
                  {...register("password", { required: true })}
                  placeholder="Contraseña"
                />

                <input
                  type="password"
                  {...register("user_password_confirm", { required: true })}
                  placeholder="Confirmar Contraseña"
                />
              </section>
            </section>
          )}
        </section>

        <section className="register__arrows">
          <div
            className={
              state == 2 || state == 3 ? "submit_buttn--active" : "submit_buttn"
            }
            onClick={changeStateBackwards}
          >
            <FaArrowLeft />
          </div>
          {state == 2 ? (
            <button type="Submit" className="submit_buttn--active">
              <FaArrowRight />
            </button>
          ) : (
            <div
              className={
                state == 1 || state == 2
                  ? "submit_buttn--active"
                  : "submit_buttn"
              }
              onClick={changeStateForward}
            >
              <FaArrowRight />
            </div>
          )}
        </section>

        <section className="dots">
          <div className={state == 1 ? "dot--active" : "dot"}></div>
          <div className={state == 2 ? "dot--active" : "dot"}></div>
        </section>
        <p className="login__register">
          ¿Ya tienes una cuenta? <span onClick={onBar}>Login</span>
        </p>
      </form>
    </section>
  );
};

export default Register;
