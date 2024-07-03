import AboutUs from "../components/AboutUs";
import Brands from "../components/Brands";
import Categories from "../components/Categories";

import HighlightedOffers from "../components/HighlightedOffers";
import Form from "../components/Form";


const Home = () => {
  return (
    <>
      <Categories category={""} />
      <AboutUs />
      <Brands />
      <HighlightedOffers />
      <Form></Form>

    </>
  );
};

export default Home;
