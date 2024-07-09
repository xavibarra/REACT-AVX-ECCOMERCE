import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaCodeCompare, FaRegStar, FaShop } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import type { Product } from "../models/product";
import "../styles/flip-card.css";

interface FlipCardProps {
  product: Product;
}

const FlipCard: React.FC<FlipCardProps> = ({ product }) => {
  const [showIndicator, setShowIndicator] = useState(false);
  const navigate = useNavigate();

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

  const formatCityList = (): string => {
    const cities: string[] = [];

    Object.keys(product).forEach((key) => {
      if (key.endsWith("Stock") && product[key as keyof Product]) {
        const city = key.replace("Stock", "");
        cities.push(formatCityName(city));
      }
    });

    if (cities.length === 0) return "";
    if (cities.length === 1) return cities[0];
    const lastCity = cities.pop();
    return cities.join(", ") + " y " + lastCity;
  };

  const formatCityName = (cityName: string): string => {
    return cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      className="flip-card bg-transparent perspective-1000 font-sans cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flip-card-inner relative w-full h-full text-center transition-transform duration-700">
        <div className="flip-card-front absolute flex flex-col w-full h-full bg-white shadow-md">
          {product.offer && <span className="card-offer-span"></span>}
          <div className="cardContainer">
            <div className="topCard">
              <div className="imgCard">
                <img
                  className="card-img mx-auto"
                  src={product.imageUrl}
                  alt={product.name}
                />
              </div>
              <div className="compareIcon">
                <FaCodeCompare />
              </div>
            </div>
            <div className="cardInfo">
              <p className="card-name text-left mx-2 text-xs">{product.name}</p>
              <div className="card-prices-container flex">
                <p className="card-price">
                  {(product.price * (1 - product.discount / 100)).toFixed(2)}€
                </p>
                {product.discount > 0 && (
                  <p className="card-price-offer font-light text-xs line-through">
                    {product.price.toFixed(2)}€
                  </p>
                )}
              </div>
              <div className="starsIcon">
                {[...Array(5)].map((_, index) => (
                  <FaRegStar key={index} className="starIcon" />
                ))}
              </div>
            </div>
          </div>
          <div className="bottomCard">
            <button className="card-button relative text-white p-1 mx-2 my-2 rounded flex justify-center items-center cursor-pointer">
              <span className="tooltip absolute top-0 text-xs text-white p-1 rounded shadow opacity-0 pointer-events-none transition-all duration-300 ease-in-out">
                {(product.price * (1 - product.discount / 100)).toFixed(2)}€
              </span>
              <span> Add to card </span>
            </button>
            <div className="favIcon">
              <CiHeart />
            </div>
          </div>
        </div>
        <div className="flip-card-back absolute flex flex-col justify-between w-full h-full bg-white shadow-md transform rotate-y-180">
          <div className="descriptionProduct">
            <p>{product.categories.category_description_en}</p>
          </div>
          <div className="infoCardBack">
            <div className="stock">
              <FaShop />
              <h3 className="">Disponibilidad en tienda:</h3>
            </div>
            <div
              className="overflow-y-auto hide-scrollbar relative cities"
              id="store-list"
            >
              <p className="card-city list-none my-1 text-left mx-2 flex items-center">
                {formatCityList()}.
              </p>
            </div>
          </div>
          <div className="bottomCardBack">
            <div className="bottomCard">
              <button className="card-button relative text-white p-1 mx-2 my-2 rounded flex justify-center items-center cursor-pointer">
                <span className="tooltip absolute top-0 text-xs text-white p-1 rounded shadow opacity-0 pointer-events-none transition-all duration-100 ease-in-out">
                  {(product.price * (1 - product.discount / 100)).toFixed(2)}€
                </span>
                <span> Add to card </span>
              </button>
              <div className="favIcon">
                <CiHeart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
