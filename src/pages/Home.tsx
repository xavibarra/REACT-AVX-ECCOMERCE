import AboutUs from "../components/AboutUs";
import Brands from "../components/Brands";
import Categories from "../components/Categories";
import FlipCard from "../components/FlipCard";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Categories category={""} />
      <AboutUs />
      <Brands />
      <FlipCard></FlipCard>
      <Footer />
    </>
  );
};

export default Home;
