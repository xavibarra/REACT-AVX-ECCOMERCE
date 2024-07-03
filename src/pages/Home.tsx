import AboutUs from "../components/AboutUs";
import Brands from "../components/Brands";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
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
      <Footer />
    </>
  );
};

export default Home;
