import "../styles/burger-menu.css";
import { FaCodeCompare, FaPuzzlePiece, FaHeart } from "react-icons/fa6";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



interface BurgerMenuProps {
    menuVisible: boolean;
};

const BurgerMenu: React.FC<BurgerMenuProps> = ({ menuVisible }) => {

    const [categoriesVisible, setCategoriesVisible] = useState(false);


    const toggleCategories = () => {
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

    return (
        <>
            <div className={`burger-container ${menuVisible ? 'visible' : 'hidden'}`}>
                <a href="#" className="burger-icon-name-first">
                    <FaHeart className="burger-icon" />
                    <p>Favoritos</p>
                </a>
                <a href="#" className="burger-icon-name">
                    <FaCodeCompare className="burger-icon" />
                    <p>Comparador</p>
                </a>
                <a href="#" className="burger-icon-name-third" onClick={toggleCategories}>
                    <FaPuzzlePiece className="burger-icon" />
                    <p>Componentes</p>
                </a>
            </div>
            <div className={`burger-categories-container ${categoriesVisible ? 'visible' : 'hidden'}`}>
                <a href="" className="burger-category-name-first" onClick={goToCase}>
                    <p>CASE</p>
                </a>
                <a href="" className="burger-category-name" onClick={goToPowerSupply}>
                    <p>POWER SUPPLY</p>
                </a>
                <a href="" className="burger-category-name" onClick={goToGraphicCard}>
                    <p>GRAPHIC CARD</p>
                </a>
                <a href="" className="burger-category-name" onClick={goToCpuCooler}>
                    <p>CPU COOLER</p>
                </a>
                <a href="" className="burger-category-name" onClick={goToMotherBoard}>
                    <p>MOTHERBOARD</p>
                </a>
                <a href="" className="burger-category-name-2" onClick={goToExternalHardDrive}>
                    <p>EXTERNAL HARD DRIVE</p>
                </a>
                <a href="" className="burger-category-name" onClick={goToMonitor}>
                    <p>MONITOR</p>
                </a>
                <a href="" className="burger-category-name-2" onClick={goToInternalHardDrive}>
                    <p>INTERNAL HARD DRIVE</p>
                </a>
                <a href="" className="burger-category-name" onClick={goToRamMemory}>
                    <p>RAM MEMORY</p>
                </a>
                <a href="" className="burger-category-name" onClick={goToCaseFan}>
                    <p>CASE FAN</p>
                </a>
                <a href="" className="burger-category-name" onClick={goToOpticalDrive}>
                    <p>OPTICAL DRIVE</p>
                </a>
                <a href="" className="burger-category-name" onClick={goToCpu}>
                    <p>CPU</p>
                </a>
            </div>
        </>

    );
};

export default BurgerMenu;
