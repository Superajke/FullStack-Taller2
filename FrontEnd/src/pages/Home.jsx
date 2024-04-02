import { useAuth } from "../context/UserContext";
import "../css/Home.css";
function Home() {
  const { user } = useAuth();
  return (
    <section className="home">
      <h1 className="home__title">
        ¡Bienvenido {user?.firstName} {user?.lastName}!
      </h1>
    </section>
  );
}

export default Home;
