import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FaCodeCompare, FaShop } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import type { Product } from "../models/product";
import "../styles/flip-card.css";
import { supabaseClient } from "../utils/supabaseClient";

interface FlipCardProps {
  product: Product;
}

const FlipCard: React.FC<FlipCardProps> = ({ product }) => {
  const [showIndicator, setShowIndicator] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  async function getUserData() {
    const { data, error } = await supabaseClient.auth.getUser();
    if (error) {
      console.error("Error fetching user data:", error);
    } else {
      setUser(data.user);
      console.log(data.user.id);
    }
  }

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

  // Función para generar las estrellas según el rating
  const generateStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} />
        ))}
        {hasHalfStar && <FaStarHalfAlt />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} />
        ))}
      </>
    );
  };

  const handleAddToCartClick = async (event: React.MouseEvent) => {
    event.stopPropagation();

    try {
      const { data, error } = await supabaseClient.auth.getUser();
      if (error) {
        console.error("Error fetching user data:", error);
        return;
      }

      const userId = data.user.id;
      const productId = product.id;

      const response = await fetch("http://localhost:3000/users/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }

      const result = await response.json();
      console.log(result.message); // Aquí puedes manejar la respuesta del backend
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
    }
  };

  const handleAddToLikeClick = async (event: React.MouseEvent) => {
    event.stopPropagation();

    try {
      const { data, error } = await supabaseClient.auth.getUser();
      if (error) {
        console.error("Error fetching user data:", error);
        return;
      }

      const userId = data.user.id;
      const productId = product.id;

      const response = await fetch("http://localhost:3000/users/add-like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product to likes");
      }

      const result = await response.json();
      console.log(result.message); // Maneja la respuesta del backend como desees
    } catch (error) {
      console.error("Error adding product to likes:", error.message);
    }
  };

  return (
    <div
      className="flip-card bg-transparent perspective-1000 font-sans cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flip-card-inner relative w-full h-full text-center transition-transform duration-500">
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
              <div className="starsIcon">{generateStars(product.rating)}</div>
            </div>
          </div>
          <div className="bottomCard">
            <button
              className="card-button relative text-white p-1 mx-2 my-2 rounded flex justify-center items-center cursor-pointer"
              onClick={handleAddToCartClick}
            >
              <span className="tooltip absolute top-0 text-xs text-white p-1 rounded shadow opacity-0 pointer-events-none transition-all duration-300 ease-in-out">
                {(product.price * (1 - product.discount / 100)).toFixed(2)}€
              </span>
              <span>Add to cart</span>
            </button>
            <div className="favIcon" onClick={handleAddToLikeClick}>
              <CiHeart />
            </div>
          </div>
        </div>
        <div className="flip-card-back absolute flex flex-col justify-between w-full h-full bg-white shadow-md transform rotate-y-180">
          <div className="descriptionProduct">
            <p>{product.categories?.category_description_en}</p>
          </div>
          <div className="infoCardBack">
            <div className="stock">
              <FaShop />
              <h3 className="">Availability in store:</h3>
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
              <button
                className="card-button relative text-white p-1 mx-2 my-2 rounded flex justify-center items-center cursor-pointer"
                onClick={handleAddToCartClick}
              >
                <span className="tooltip absolute top-0 text-xs text-white p-1 rounded shadow opacity-0 pointer-events-none transition-all duration-100 ease-in-out">
                  {(product.price * (1 - product.discount / 100)).toFixed(2)}€
                </span>
                <span>Add to cart</span>
              </button>
              <div className="favIcon" onClick={handleAddToLikeClick}>
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
