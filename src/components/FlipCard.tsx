import React, { useEffect, useState } from "react";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

import iconLocation from "../assets/img/icons8-mapas-48.png";

import type { Product } from "../models/product"; // Importar Product como solo tipo
import "../styles/flip-card.css";

interface FlipCardProps {
  product: Product;
}

const FlipCard: React.FC<FlipCardProps> = ({ product }) => {
  const [showIndicator, setShowIndicator] = useState(false);
  const navigate = useNavigate(); // Usar el hook useNavigate para la navegación

  useEffect(() => {
    const storeList = document.getElementById("store-list");

    function checkOverflow() {
      if (storeList && storeList.scrollHeight > storeList.clientHeight) {
        setShowIndicator(true);
      } else {
        setShowIndicator(false);
      }
    }

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);

  const handleCardClick = () => {
    // Navegar a la página de detalles del producto
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      className="m-11 flip-card w-48 h-72 bg-transparent perspective-1000 font-sans cursor-pointer"
      onClick={handleCardClick} // Añadir onClick al contenedor principal
    >
      <div className="flip-card-inner relative w-full h-full text-center transition-transform duration-700">
        <div className="flip-card-front absolute flex flex-col justify-between w-full h-full bg-white shadow-md">
          {product.offer && <span className="card-offer-span"></span>}
          <img
            className="card-img w-7/12 mx-auto"
            src={product.imageUrl}
            alt={product.name}
          />
          <p className="card-name text-left mx-2 text-xs">{product.name}</p>
          <div className="flex m-2">
            {[...Array(5)].map((_, index) => (
              <MdOutlineStarPurple500 key={index} />
            ))}
          </div>
          <div className="card-prices-container flex">
            <p className="card-price font-extrabold m-2 text-sm">
              {(product.price * (1 - product.discount / 100)).toFixed(2)}€
            </p>
            {product.discount > 0 && (
              <p className="card-price-offer font-light text-xs self-center line-through ml-1">
                {product.price.toFixed(2)}€
              </p>
            )}
          </div>
          <div className="card-button relative text-white p-1 mx-2 my-2 rounded flex justify-center items-center cursor-pointer">
            <span className="tooltip absolute top-0 text-xs text-white p-1 rounded shadow opacity-0 pointer-events-none transition-all duration-300 ease-in-out">
              {product.price.toFixed(2)}€
            </span>
            <span> Añadir al carrito </span>
          </div>
        </div>
        <div className="flip-card-back absolute flex flex-col justify-between w-full h-full bg-white shadow-md transform rotate-y-180">
          <p className="title font-bold mt-3">TIENDAS CON STOCK:</p>
          <ul
            className="overflow-y-auto hide-scrollbar relative"
            id="store-list"
          >
            {Object.keys(product).map((key) => {
              if (key.endsWith("Stock") && product[key as keyof Product]) {
                const city = key.replace("Stock", "");
                return (
                  <li
                    key={key}
                    className="card-city list-none my-1 text-left mx-2 flex items-center"
                  >
                    <img
                      className="icon w-4 mr-1"
                      src={iconLocation}
                      alt="icon location"
                    />
                    {city}
                  </li>
                );
              }
              return null;
            })}
          </ul>
          {showIndicator && (
            <div className="scroll-indicator absolute bottom-0 right-0 left-0 text-center mb-1">
              <span className="text-xs">▼</span>
            </div>
          )}
          <div className="card-button relative text-white p-1 mx-2 my-2 rounded flex justify-center items-center cursor-pointer">
            <span className="tooltip absolute top-0 text-xs text-white p-1 rounded shadow opacity-0 pointer-events-none transition-all duration-300 ease-in-out">
              {product.price.toFixed(2)}€
            </span>
            <span> Añadir al carrito </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
