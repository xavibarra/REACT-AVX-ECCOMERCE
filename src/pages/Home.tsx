import AboutUs from "../components/AboutUs";
import Brands from "../components/Brands";
import Categories from "../components/Categories";
import FlipCard from "../components/FlipCard";
import Navbar from "../components/NavBar";

const Home = () => {
  return (
    <>
      <Navbar />
      <Categories />
      <AboutUs />
      <Brands />
      <FlipCard />
    </>
  );
};

export default Home;
