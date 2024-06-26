import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Cart from "./components/cart/Cart";
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
      <Cart />
      <Footer />
    </main>
  );
}

export default App;
