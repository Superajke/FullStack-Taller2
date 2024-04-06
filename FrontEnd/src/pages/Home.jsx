import { useAuth } from "../context/UserContext";
import Sponge from "../img/Sponge.jpg";
import "../css/Home.css";
import { useNavigate } from "react-router-dom";
function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <section className="home">
      <section className="home__container">
        <h1 className="home__title">
          ¡Bienvenido {user?.firstName} {user?.lastName}!
        </h1>
        <figure>
          <img src={Sponge} alt="Sponge" className="home__img" />
        </figure>
        <p onClick={() => {navigate("/products")}} className="home__sections">Ver productos</p>
        <p onClick={() => {navigate("/products")}} className="home__sections">Comprar productos</p>
        <h2 className="home__subtitle">¡Gracias por preferirnos!</h2>
      </section>
    </section>
  );
}

export default Home;
