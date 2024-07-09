import "../styles/burger-menu.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FaCodeCompare, FaPuzzlePiece } from "react-icons/fa6";



const BurgerMenu = () => {
    return(
        <>
        <div className="burger-container">
                <a href="" className="burger-icon-name">
                    <FontAwesomeIcon className="icon" icon={faHeart} />
                    <p>Favoritos</p>
                </a>
                <a href="" className="burger-icon-name">
                    <FaCodeCompare className="icon" />
                    <p>Comparador</p>
                </a>
                <a href="" className="burger-icon-name">
                    <FaPuzzlePiece className="icon" />
                    <p>Componentes</p>
                </a>
        </div>
        </>
    )
}

export default BurgerMenu;
