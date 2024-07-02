import { SetStateAction, useEffect, useState } from "react";
import { FaBars, FaShoppingBasket, FaUser } from "react-icons/fa";
import "../styles/navbar.css";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      // Realizar la solicitud de búsqueda
      fetch(
        `http://localhost:3000/products/search/${encodeURIComponent(
          searchTerm
        )}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Mostrar los resultados en la consola
          setResults(data); // Actualizar el estado con los resultados
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

  return (
    <div id="navbar">
      <div className="flex-1 container-nav">
        <input
          type="text"
          name="text"
          className="inputSearch"
          value={searchTerm}
          onChange={handleInputChange}
          required
          placeholder="Buscar..."
        />
        <div className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="lupa"
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
      <div className="logoContainer"></div>
      <div className="iconsNav">
        <a href="/" className="userIcon">
          <FaUser />
        </a>
        <a href="/" className="cartIcon">
          <FaShoppingBasket />
        </a>
        <a href="/" className="burguerIcon">
          <FaBars />
        </a>
      </div>
    </div>
  );
}

export default Navbar;