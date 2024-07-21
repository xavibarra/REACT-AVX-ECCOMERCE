import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaBars, FaShoppingBasket, FaUser } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import BurgerMenu from "../components/BurgerMenu";
import "../styles/navbar.css";
import { supabaseClient } from "../utils/supabaseClient";
import FloatCart from "./FloatCart";
import { FloatCartContext } from "./SetFloatCartVisibleContext";

function Navbar() {
  const [user, setUser] = useState({});
  const context = useContext(FloatCartContext);
  const location = useLocation();

  if (!context) {
    throw new Error("NavBar must be used within a FloatCartProvider");
  }

  const { isFloatCartVisible, setFloatCartVisible, fetchCart } = context;

  useEffect(() => {
    async function checkUser() {
      const { data, error } = await supabaseClient.auth.getUser();
      if (error) {
        setUser(null);
      } else {
        setUser(data.user);
      }
    }

    checkUser();
  }, []);

  const navigate = useNavigate();

  const goToProfileOrLogin = () => {
    if (user) {
      window.scrollTo(0, 0);
      navigate("/profile");
      console.log(user);
    } else {
      navigate("/login");
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  /* --------------------------------------------------------------- NAVBAR SCROLL CANVI --*/
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("navbar");
      const logoSvg = document.querySelector(".logoContainer svg");
      if (window.scrollY > 0) {
        setMenuVisible(false);
        setCategoriesVisible(false);
        setIsIconRotated(false);
      }
      if (navbar && logoSvg) {
        if (window.scrollY > 600) {
          navbar.classList.add("scroll");
          navbar.classList.remove("hidden");
          logoSvg.classList.add("show");
        } else if (window.scrollY > 0 && window.scrollY <= 600) {
          navbar.classList.add("hidden");
          navbar.classList.remove("scroll");
          logoSvg.classList.remove("show");
        } else {
          navbar.classList.remove("scroll", "hidden");
          logoSvg.classList.remove("show");
        }
      }

      // Ocultar el carrito flotante al hacer scroll
      setFloatCartVisible(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      setResults([]);
    }
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setShowResults(true);
  };

  const handleInputClick = () => {
    setShowResults(true);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".searchContainer")) {
        setShowResults(false);
        setSearchTerm(""); // Limpiar el valor del input
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleCardClick = (productId) => (event) => {
    event.preventDefault();
    navigate(`/product/${productId}`);
  };

  const goHome = () => {
    window.scrollTo(0, 0);
    navigate("/");
  };

  const [menuVisible, setMenuVisible] = useState(false);
  const [isIconRotated, setIsIconRotated] = useState(false);
  const [categoriesVisible, setCategoriesVisible] = useState(false);

  const toggleMenu = (event) => {
    event.preventDefault();
    setMenuVisible(!menuVisible);
    setIsIconRotated(!isIconRotated);
    if (menuVisible) {
      setCategoriesVisible(false);
    }
    // Ocultar el carrito flotante al abrir el menú
    setFloatCartVisible(false);
  };

  const toggleFloatCart = async () => {
    try {
      const { data, error } = await supabaseClient.auth.getUser();
      if (error || !data.user) {
        console.error("User not authenticated:", error);
        navigate("/login"); // Redirige a la página de inicio de sesión si no está autenticado
        return;
      }

      if (location.pathname !== "/cart") {
        setFloatCartVisible(!isFloatCartVisible);
      }
      if (!isFloatCartVisible) {
        await fetchCart(); // Actualiza el carrito solo cuando se abre
      }
      setMenuVisible(false);
      setCategoriesVisible(false);
      setIsIconRotated(false);
    } catch (error) {
      console.error("Error checking user authentication:", error.message);
    }
  };

  const hideFloatCart = () => {
    setFloatCartVisible(false);
  };
  const { t } = useTranslation("global");

  return (
    <>
      <div id="navbar" className="normal">
        <div className="flex-1 container-nav">
          <div className="searchContainer">
            <input
              type="text"
              name="text"
              className="inputSearch2"
              value={searchTerm}
              onChange={handleInputChange}
              onClick={handleInputClick}
              required
              placeholder={t("navbar.search")}
            />
            <div className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="lupa2"
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
            {showResults && (
              <div className="searchResults">
                {results.length > 0 ? (
                  results.map((result) => (
                    <div
                      key={result.id}
                      className="searchResultItem"
                      onClick={handleCardClick(result.id)}
                    >
                      <img
                        src={result.imageUrl || "default-image.png"}
                        alt={result.name}
                        className="resultImage"
                      />
                      <div className="resultDetails">
                        <p className="resultName">{result.name}</p>
                        <p className="resultPrice">
                          €{result.price?.toFixed(2) ?? ""}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="searchResultItem">
                    {t("navbar.search_results")}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <a href="" onClick={goHome}>
          <div className="logoContainer fill-white">
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1908 576"
              className="h-auto w-full max-w-lg show"
            >
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
              <text
                className="font-semi-bold"
                transform="translate(231.47 473.26)"
              >
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
              <text
                className="font-light4"
                transform="translate(528.29 246.07)"
              >
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
        <div className="iconsNav">
          <a className="userIcon">
            <FaUser
              onClick={() => {
                goToProfileOrLogin();
                hideFloatCart();
              }}
            />
          </a>
          <a className="cartIcon">
            <FaShoppingBasket onClick={toggleFloatCart} />
          </a>
          <a
            href=""
            className={`burgerIcon ${isIconRotated ? "rotated" : ""}`}
            onClick={toggleMenu}
          >
            <FaBars />
          </a>
        </div>
      </div>

      <BurgerMenu
        menuVisible={menuVisible}
        setCategoriesVisible={setCategoriesVisible}
        categoriesVisible={categoriesVisible}
      />
      <FloatCart
        className={
          isFloatCartVisible
            ? "float-cart-container"
            : "float-cart-container-hidden"
        }
      />
    </>
  );
}

export default Navbar;
