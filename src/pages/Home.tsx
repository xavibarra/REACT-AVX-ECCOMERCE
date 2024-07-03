import AboutUs from "../components/AboutUs";
import Brands from "../components/Brands";
import Categories from "../components/Categories";
import HighlightedOffers from "../components/HighlightedOffers";

const Home = () => {
  return (
    <>
      <Categories category={""} />
      <AboutUs />
      <Brands />
      <HighlightedOffers />
    </>
  );
};

export default Home;
