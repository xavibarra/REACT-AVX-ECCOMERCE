import { FaBars, FaShoppingBasket, FaUser } from "react-icons/fa";
import circulo from "../assets/img/circulo.png";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <div id="nav-container">
      <div id="nav-left">
        <div className="container">
          <input
            type="text"
            name="text"
            className="input"
            required
            placeholder="Buscar..."
          ></input>
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ionicon"
              viewBox="0 0 512 512"
            >
              <path
                d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                fill="none"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeWidth="32"
              ></path>
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="32"
                d="M338.29 338.29L448 448"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div id="nav-mid">
        <img id="circulo" src={circulo} alt="" />
        <p id="avx">AVX</p>
        <p id="comp">components</p>
      </div>
      <div id="nav-right">
        <a href="/">
          <FaUser className="ico" />
        </a>
        <a href="/">
          <FaShoppingBasket className="ico" />
        </a>
        <a href="/">
          <FaBars className="ico" />
        </a>
      </div>
    </div>
  );
}

export default Navbar;
