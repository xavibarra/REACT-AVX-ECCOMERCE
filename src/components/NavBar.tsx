import { useState, useEffect, useCallback } from "react";
import { FaBars, FaShoppingBasket, FaUser } from "react-icons/fa";
import { debounce } from "lodash";
import circulo from "../assets/img/circulo.png";
import "../styles/Navbar.css";

function Navbar() {
  // Estado para almacenar el término de búsqueda
  const [query, setQuery] = useState(''); // Modificado: Añadido el estado query
  // Estado para almacenar los resultados de la búsqueda
  const [results, setResults] = useState<any[]>([]); // Modificado: Añadido el estado results

  // Función para realizar la búsqueda en el backend
  const fetchData = async (searchQuery: string) => {
    if (searchQuery.length > 0) {
      const response = await fetch(`/api/search?query=${searchQuery}`);
      const data = await response.json();
      setResults(data);
    } else {
      setResults([]);
    }
  };

  // Función debounced para optimizar las solicitudes de búsqueda
  const debouncedFetchData = useCallback(debounce(fetchData, 300), []); // Modificado: Añadido debounce para fetchData

  // useEffect para ejecutar la búsqueda cada vez que cambia query
  useEffect(() => {
    debouncedFetchData(query); // Modificado: Añadido el efecto para ejecutar la búsqueda
  }, [query, debouncedFetchData]);

  return (
    <div id="nav-container">
      <div id="nav-left">
        <div className="container-nav">
          <input
            type="text"
            name="text"
            className="input"
            required
            placeholder="Buscar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
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
