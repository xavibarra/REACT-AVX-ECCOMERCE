import ComparatorContent from "../components/ComparatorContent";
import Footer from "../components/Footer";
import LanguageSwitcher from "../components/LanguageSwitcher";
import Navbar2 from "../components/NavBar2";

const Comparator = () => {
  return (
    <>
      <Navbar2 />
      <LanguageSwitcher />
      <ComparatorContent />
      <Footer />
    </>
  );
};

export default Comparator;
