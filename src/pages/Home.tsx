import AboutUs from "../components/AboutUs";
import Brands from "../components/Brands";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Form from "../components/Form";
import HighlightedOffers from "../components/HighlightedOffers";
import LanguageSwitcher from "../components/LanguageSwitcher";

const Home = () => {
  return (
    <>
      <Categories category={""} />
      <LanguageSwitcher />
      <AboutUs />
      <Brands />
      <HighlightedOffers />
      <Form></Form>
      <Footer />
    </>
  );
};

export default Home;
