import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/creatorflipcard.css";


interface CreatorProps {
  name: string;
  foto: string;
  descripcion: string;
  offer: boolean;
  rating: number;
}

const CreatorFlipCard: React.FC<CreatorProps> = ({name, foto, descripcion, offer, rating}) => {
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
 

  return (
    <div
      className="flip-card bg-transparent perspective-1000 font-sans cursor-pointer">
      <div className="flip-card-inner relative w-full h-full text-center transition-transform duration-700">
        <div className="flip-card-front absolute flex flex-col w-full h-full bg-white shadow-md">
          {offer == true &&(
          <span className="card-offer-span"></span>
          )}
          <div className="cardContainer">
            <div className="topCard">
              <div className="imgCard">
                <img
                  className="creator-card-img mx-auto"
                  src={foto}
                  alt={name}
                />
              </div>
            </div>
            <div className="cardInfo">
              <p className="card-name text-left mx-2 text-xs">{name}</p>
              <div className="card-prices-container flex">
                <p className="card-price">
                  1€
                </p>
                  <p className="card-price-offer font-light text-xs line-through">
                    €
                  </p>
              </div>
              <div className="starsIcon">{generateStars(rating)}</div>
            </div>
          </div>
          <div className="bottomCard">
            <button className="card-button relative text-white p-1 mx-2 my-2 rounded flex justify-center items-center cursor-pointer">
              <span className="tooltip absolute top-0 text-xs text-white p-1 rounded shadow opacity-0 pointer-events-none transition-all duration-300 ease-in-out">
                1€
              </span>
              <span> Add to cart </span>
            </button>
            <div className="favIcon">
              <CiHeart />
            </div>
          </div>
        </div>
        <div className="flip-card-back absolute flex flex-col justify-between w-full h-full bg-white shadow-md transform rotate-y-180">
          <div className="creatorDescriptionProduct">
            <p>{descripcion}</p>
          </div>
          <div className="infoCardBack">
            
          </div>
          <div className="bottomCardBack">
            <div className="bottomCard">
              <button className="card-button relative text-white p-1 mx-2 my-2 rounded flex justify-center items-center cursor-pointer">
                <span className="tooltip absolute top-0 text-xs text-white p-1 rounded shadow opacity-0 pointer-events-none transition-all duration-100 ease-in-out">
                  1€
                </span>
                <span> Add to cart </span>
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

export default CreatorFlipCard;
