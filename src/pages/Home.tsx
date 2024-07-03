import AboutUs from "../components/AboutUs";
import Brands from "../components/Brands";
import Categories from "../components/Categories";
import FlipCard from "../components/FlipCard";
import Form from "../components/Form";

const Home = () => {
  return (
    <>
      <Categories category={""} />
      <AboutUs />
      <Brands />
      <FlipCard></FlipCard>
      <Form></Form>
    </>
  );
};

export default Home;
