import { useForm } from "react-hook-form";
import Register from "../components/Register";
import "../css/Login.css";
import { useEffect, useState } from "react";
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const { logIn, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const showLoginForm = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const showRegisterForm = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (data) => {
    let key = true;
    if (!data.email) {
      console.log("second");
      key = false;
    }
    if (!data.password) {
      console.log("first");
      key = false;
    }
    if (key) {
      await logIn(data);
    }
  });

  return (
    <>
      <section className={!showRegister ? "active" : "hidden"}>
        {showLogin && (
          <section className="login">
            <form onSubmit={onSubmit} className="login__form">
              <section className="login__bars">
                <div className="login__bar--modifier"></div>
                <div className="login__bar" onClick={showRegisterForm}></div>
              </section>

              <p>Correo Eléctronico</p>
              <input type="text" {...register("email")} />

              <p>Contraseña</p>
              <input type="password" {...register("password")} />
              <button type="submit" className="submit_button">
                Iniciar Sesión
              </button>
              <p className="login__register">
                ¿No tienes una cuenta?{" "}
                <span onClick={showRegisterForm}>Registrate</span>
              </p>
            </form>
          </section>
        )}
      </section>
      <section className={!showRegister ? "hidden" : "active"}>
        {showRegister && <Register showLoginForm={showLoginForm} />}
      </section>
    </>
  );
}

export default LogIn;
