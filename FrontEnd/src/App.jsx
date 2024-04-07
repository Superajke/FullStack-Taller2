import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import { useAuth } from "./context/UserContext";
import RoutesPG from "./routes/RoutesPG";

function App() {
  const { isAuthenticated, user } = useAuth();
  return (
    <main>
      <section className="content">
        {isAuthenticated && <Sidebar />}
        <section className="each_page">
          <RoutesPG />
        </section>
      </section>
      {isAuthenticated && user?.role ==="USER" && <Cart />}
      <Footer />
    </main>
  );
}

export default App;
