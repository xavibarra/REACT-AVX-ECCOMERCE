import "../styles/burger-menu.css";
import { FaCodeCompare, FaPuzzlePiece } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";




const BurgerMenu = () => {
    return(
        <>
        <div className="burger-container">
                <a href="" className="burger-icon-name">
                    <FaHeart className="burger-icon" />
                    <p>Favoritos</p>
                </a>
                <a href="" className="burger-icon-name">
                    <FaCodeCompare className="burger-icon" />
                    <p>Comparador</p>
                </a>
                <a href="" className="burger-icon-name">
                    <FaPuzzlePiece className="burger-icon" />
                    <p>Componentes</p>
                </a>
        </div>
        </>
    )
}

export default BurgerMenu;
