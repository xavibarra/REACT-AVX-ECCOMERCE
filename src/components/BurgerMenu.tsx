import { FaCodeCompare, FaHeart, FaPuzzlePiece } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "../styles/burger-menu.css";
import { useTranslation } from "react-i18next";

interface BurgerMenuProps {
  menuVisible: boolean;
  setCategoriesVisible: (visible: boolean) => void;
  categoriesVisible: boolean;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({
  menuVisible,
  setCategoriesVisible,
  categoriesVisible,
}) => {
  const toggleCategories = () => {
    event.preventDefault();
    setCategoriesVisible(!categoriesVisible);
  };
  const { t } = useTranslation("global");

  const navigate = useNavigate();

  const goToComparator = () => {
    window.scrollTo(0, 0);
    navigate("/comparator");
  };
  const goToCase = () => {
    window.scrollTo(0, 0);
    navigate("/productsByCategory/1");
  };
  const goToPowerSupply = () => {
    window.scrollTo(0, 0);
    navigate("/productsByCategory/11");
  };
  const goToGraphicCard = () => {
    window.scrollTo(0, 0);
    navigate("/productsByCategory/12");
  };
  const goToCpuCooler = () => {
    window.scrollTo(0, 0);
    navigate("/productsByCategory/4");
  };
  const goToMotherBoard = () => {
    window.scrollTo(0, 0);
    navigate("/productsByCategory/9");
  };
  const goToExternalHardDrive = () => {
    window.scrollTo(0, 0);
    navigate("/productsByCategory/5");
  };
  const goToMonitor = () => {
    window.scrollTo(0, 0);
    navigate("/productsByCategory/8");
  };
  const goToInternalHardDrive = () => {
    window.scrollTo(0, 0);
    navigate("/productsByCategory/6");
  };
  const goToRamMemory = () => {
    window.scrollTo(0, 0);
    navigate("/productsByCategory/7");
  };
  const goToCaseFan = () => {
    window.scrollTo(0, 0);
    navigate("/productsByCategory/2");
  };
  const goToOpticalDrive = () => {
    window.scrollTo(0, 0);
    navigate("/productsByCategory/10");
  };
  const goToCpu = () => {
    window.scrollTo(0, 0);
    navigate("/productsByCategory/3");
  };
  const goToLikes = () => {
    window.scrollTo(0, 0);
    navigate("/likes");
  };

  return (
    <>
      <div
        id="burger-container"
        className={`burger-container ${menuVisible ? "visible" : "hidden"}`}>
        <a href="" className="burger-icon-name-first" onClick={goToLikes}>
          <FaHeart className="burger-icon" />
          <p>{t("navbar.favorites")}</p>
        </a>
        <a href="#" className="burger-icon-name" onClick={goToComparator}>
          <FaCodeCompare className="burger-icon" />
          <p>{t("navbar.comparator")}</p>
        </a>
        <a
          href="#"
          className="burger-icon-name-third"
          onClick={toggleCategories}>
          <FaPuzzlePiece className="burger-icon" />
          <p>{t("navbar.components")}</p>
        </a>
      </div>
      <div
        id="burger-categories-container"
        className={`burger-categories-container ${
          categoriesVisible ? "visible" : "hidden"
        }`}>
        <a href="" className="burger-category-name-first" onClick={goToCase}>
          <p>{t("categories.case")}</p>
        </a>
        <a href="" className="burger-category-name" onClick={goToPowerSupply}>
          <p>{t("categories.power_supply")}</p>
        </a>
        <a href="" className="burger-category-name" onClick={goToGraphicCard}>
          <p>{t("categories.graphic_card")}</p>
        </a>
        <a href="" className="burger-category-name" onClick={goToCpuCooler}>
          <p>{t("categories.cpu_cooler")}</p>
        </a>
        <a href="" className="burger-category-name" onClick={goToMotherBoard}>
          <p>{t("categories.motherboard")}</p>
        </a>
        <a
          href=""
          className="burger-category-name-2"
          onClick={goToExternalHardDrive}>
          <p>{t("categories.external_hard_drive")}</p>
        </a>
        <a href="" className="burger-category-name" onClick={goToMonitor}>
          <p>{t("categories.monitor")}</p>
        </a>
        <a
          href=""
          className="burger-category-name-2"
          onClick={goToInternalHardDrive}>
          <p>{t("categories.internal_hard_drive")}</p>
        </a>
        <a href="" className="burger-category-name" onClick={goToRamMemory}>
          <p>{t("categories.ram_memory")}</p>
        </a>
        <a href="" className="burger-category-name" onClick={goToCaseFan}>
          <p>{t("categories.case_fan")}</p>
        </a>
        <a href="" className="burger-category-name" onClick={goToOpticalDrive}>
          <p>{t("categories.optical_drive")}</p>
        </a>
        <a href="" className="burger-category-name" onClick={goToCpu}>
          <p>{t("categories.cpu")}</p>
        </a>
      </div>
    </>
  );
};

export default BurgerMenu;
