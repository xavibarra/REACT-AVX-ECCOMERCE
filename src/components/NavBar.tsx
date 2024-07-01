import { useState, useEffect, useCallback } from "react";
import { FaBars, FaShoppingBasket, FaUser } from "react-icons/fa";
import { debounce } from "lodash";
import "../styles/navbar.css";

function Navbar() {
  // Estado para almacenar el término de búsqueda
  const [query, setQuery] = useState(""); // Modificado: Añadido el estado query
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
    <div className="px-6 py-2 flex flex-row justify-between h-16">
      <div className="flex-1 container-nav">
        <input
          type="text"
          name="text"
          className="input"
          required
          placeholder="Buscar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></input>
        <div className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-10 mt-3"
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
      <div className="flex-1 flex justify-center h-12">
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1908 576"
          className="h-auto w-full max-w-lg"
        >
          <defs>
            <style>{`
              .font-semi-bold {
                font-family: Montserrat-SemiBold, Montserrat;
                font-size: 295.6px;
                font-weight: 600;
              }
              .fill-black, .font-light2, .no-stroke {
                fill: #000;
              }
              .font-light2 {
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
              className="no-stroke"
              d="M401.14,102.49c-39.61-39.61-91.52-59.41-143.43-59.41l.45,202.84"
            />
            <path
              className="no-stroke"
              d="M469,252.29c0-56.01-22.7-106.72-59.41-143.43l-143.11,143.75"
            />
            <path
              className="no-stroke"
              d="M102.91,414.49c39.61,39.61,91.52,59.41,143.43,59.41l-.45-202.84"
            />
            <path
              className="no-stroke"
              d="M35.95,262.88c0,56.01,22.7,106.72,59.41,143.43l143.11-143.75"
            />
            <path
              className="no-stroke"
              d="M94.88,108.23c-39.61,39.61-59.41,91.52-59.41,143.43l202.84-.45"
            />
            <path
              className="no-stroke"
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
          <text className="font-light2" transform="translate(528.29 246.07)">
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
      <div className="flex-1 flex justify-end space-x-1">
        <a href="/" className="py-1">
          <FaUser />
        </a>
        <a href="/" className="px-5">
          <FaShoppingBasket />
        </a>
        <a href="/" className="py-1">
          <FaBars />
        </a>
      </div>
    </div>
  );
}

export default Navbar;
