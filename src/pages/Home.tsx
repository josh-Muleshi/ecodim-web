import Footer from "../components/Footer";
import Navbar from "../components/NavBar";

export const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
        <h1 className="text-2xl font-bold text-center">Home Page</h1>
      <Footer />
    </div>
  );
}
