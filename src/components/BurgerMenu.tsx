import { FaCodeCompare, FaHeart, FaPuzzlePiece } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "../styles/burger-menu.css";

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

  const navigate = useNavigate();

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
      <div className={`burger-container ${menuVisible ? "visible" : "hidden"}`}>
        <a href="" className="burger-icon-name-first" onClick={goToLikes}>
          <FaHeart className="burger-icon" />
          <p>Favoritos</p>
        </a>
        <a href="#" className="burger-icon-name">
          <FaCodeCompare className="burger-icon" />
          <p>Comparador</p>
        </a>
        <a
          href="#"
          className="burger-icon-name-third"
          onClick={toggleCategories}
        >
          <FaPuzzlePiece className="burger-icon" />
          <p>Componentes</p>
        </a>
      </div>
      <div
        className={`burger-categories-container ${
          categoriesVisible ? "visible" : "hidden"
        }`}
      >
        <a href="" className="burger-category-name-first" onClick={goToCase}>
          <p>Case</p>
        </a>
        <a href="" className="burger-category-name" onClick={goToPowerSupply}>
          <p>Power Supply</p>
        </a>
        <a href="" className="burger-category-name" onClick={goToGraphicCard}>
          <p>Graphic Card</p>
        </a>
        <a href="" className="burger-category-name" onClick={goToCpuCooler}>
          <p>Cpu Cooler</p>
        </a>
        <a href="" className="burger-category-name" onClick={goToMotherBoard}>
          <p>Motherboard</p>
        </a>
        <a
          href=""
          className="burger-category-name-2"
          onClick={goToExternalHardDrive}
        >
          <p>External Hard Drive</p>
        </a>
        <a href="" className="burger-category-name" onClick={goToMonitor}>
          <p>Monitor</p>
        </a>
        <a
          href=""
          className="burger-category-name-2"
          onClick={goToInternalHardDrive}
        >
          <p>Internal Hard Drive</p>
        </a>
        <a href="" className="burger-category-name" onClick={goToRamMemory}>
          <p>Ram Memory</p>
        </a>
        <a href="" className="burger-category-name" onClick={goToCaseFan}>
          <p>Case Fan</p>
        </a>
        <a href="" className="burger-category-name" onClick={goToOpticalDrive}>
          <p>Optical Drive</p>
        </a>
        <a href="" className="burger-category-name" onClick={goToCpu}>
          <p>Cpu</p>
        </a>
      </div>
    </>
  );
};

export default BurgerMenu;
