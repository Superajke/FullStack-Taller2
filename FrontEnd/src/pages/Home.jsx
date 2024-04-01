import { useAuth } from "../context/AuthContext";

function Home() {
  const { logOut } = useAuth();
  return (
    <section>
      <div>Home</div>
      <button onClick={() => logOut()}>Cerrrar </button>
    </section>
  );
}

export default Home;
