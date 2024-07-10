import { SetStateAction, useEffect, useState } from "react";
import { FaBars, FaShoppingBasket, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/navbar2.css";
import BurgerMenu from "../components/BurgerMenu";



function Navbar2() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);


  /* --------------------------------------------------------------- SEARCH INPUT FUNCIÓ --*/
  useEffect(() => {
    if (searchTerm) {
      fetch(
        `http://localhost:3000/products/search/${encodeURIComponent(
          searchTerm
        )}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setResults(data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    } else {
      // Limpiar los resultados si el término de búsqueda está vacío
      setResults([]);
    }
  }, [searchTerm]); // Se ejecuta cuando searchTerm cambia

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };

  const navigate = useNavigate();

  const goHome = () => {
    window.scrollTo(0, 0);
    navigate("/");
  };

  const [menuVisible, setMenuVisible] = useState(false); // Estado para el menú de hamburguesa
  const [isIconRotated, setIsIconRotated] = useState(false); // Estado para la rotación del ícono
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const toggleMenu = () => {
    event.preventDefault();
    setMenuVisible(!menuVisible); // Alterna la visibilidad del menú
    setIsIconRotated(!isIconRotated); // Alterna la rotación del ícono
    if (menuVisible) { 
      setCategoriesVisible(false);
    }
  };


  return (
    <>
      <div id="navbar2">
        <div className="flex-1 container-nav2">
          <input
            type="text"
            name="text"
            className="inputSearch2"
            value={searchTerm}
            onChange={handleInputChange}
            required
            placeholder="Buscar..."
          />
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="lupa2"
              viewBox="0 0 512 512">
              <path
                d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                fill="none"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeWidth="32"></path>
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="32"
                d="M338.29 338.29L448 448"></path>
            </svg>
          </div>
        </div>
        <a href="" onClick={goHome}>
          <div className="logoContainer fill-white">
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1908 576"
              className="h-auto w-full max-w-lg show">
              <defs>
                <style>{`
              .font-semi-bold {
                font-family: Montserrat-SemiBold, Montserrat;
                font-size: 295.6px;
                font-weight: 600;
              }
              .fill-black, .no-stroke {
                fill: #ffff;
              }
              .font-light4 {
                font-family: Montserrat-Light, Montserrat;
                font-size: 88.71px;
                font-weight: 300;
              }
              .spacing-normal {
                letter-spacing: 0em;
              }
              .spacing-wide {
                letter-spacing: .79em;
              }
              .spacing-wider {
                letter-spacing: .8em;
              }
              .no-stroke {
                stroke-width: 0px;
              }
            `}</style>
              </defs>
              <g>
                <path
                  className=""
                  d="M401.14,102.49c-39.61-39.61-91.52-59.41-143.43-59.41l.45,202.84"
                />
                <path
                  className=""
                  d="M469,252.29c0-56.01-22.7-106.72-59.41-143.43l-143.11,143.75"
                />
                <path
                  className=""
                  d="M102.91,414.49c39.61,39.61,91.52,59.41,143.43,59.41l-.45-202.84"
                />
                <path
                  className=""
                  d="M35.95,262.88c0,56.01,22.7,106.72,59.41,143.43l143.11-143.75"
                />
                <path
                  className=""
                  d="M94.88,108.23c-39.61,39.61-59.41,91.52-59.41,143.43l202.84-.45"
                />
                <path
                  className=""
                  d="M246.49,41.27c-56.01,0-106.72,22.7-143.43,59.41l143.75,143.11"
                />
              </g>
              <text className="font-semi-bold" transform="translate(231.47 473.26)">
                <tspan x="0" y="0">
                  PO
                </tspan>
                <tspan className="spacing-normal" x="463.5" y="0">
                  R
                </tspan>
                <tspan className="spacing-normal" x="676.63" y="0">
                  TIONS
                </tspan>
              </text>
              <text className="font-light4" transform="translate(528.29 246.07)">
                <tspan className="spacing-wide" x="0" y="0">
                  C
                </tspan>
                <tspan className="spacing-wider" x="133.16" y="0">
                  OMPONEN
                </tspan>
                <tspan className="spacing-wide" x="1130.66" y="0">
                  T
                </tspan>
                <tspan className="spacing-wider" x="1250.42" y="0">
                  S
                </tspan>
              </text>
            </svg>
          </div>
        </a>
        <div className="iconsNav2">
          <a href="/" className="userIcon">
            <FaUser />
          </a>
          <a href="/" className="cartIcon">
            <FaShoppingBasket />
          </a>
          <a
            href="/"
            className={`burgerIcon ${isIconRotated ? 'rotated' : ''}`} // Aplica clase rotada si isIconRotated es true
            onClick={toggleMenu} // Llama a toggleMenu al hacer clic
          >
            <FaBars />
          </a>
        </div>
      </div>
      <BurgerMenu
  menuVisible={menuVisible}
  setCategoriesVisible={setCategoriesVisible}
  categoriesVisible={categoriesVisible}
/>    </>
  );
}

export default Navbar2;
