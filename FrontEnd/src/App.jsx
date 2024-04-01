import Footer from "./components/Footer";
import RoutesPG from "./routes/RoutesPG";

function App() {
  return (
    <main>
      <section className="content">
        <section className="each_page">
          <RoutesPG />
        </section>
      </section>
      <Footer />
    </main>
  );
}

export default App;
