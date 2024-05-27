import { useEffect, useState } from "react";
import { MdOutlineStarPurple500 } from "react-icons/md";

import iconLocation from "../assets/img/icons8-mapas-48.png";
// TODO PRIMARY COLOR FROM TAILWINDCONFIG
// TODO INFROMATION FROM DB
// TODO IMPROVE CSS STYLE
interface ScrollIndicatorProps {
  elementId: string;
}

function ScrollIndicator({ elementId }: ScrollIndicatorProps) {
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    const storeList = document.getElementById(elementId);

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
  }, [elementId]);

  return (
    <div
      className={`scroll-indicator absolute bottom-0 right-0 left-0 text-center mb-1 ${
        showIndicator ? "" : "invisible"
      }`}
    >
      <span className="text-xs">▼</span>
    </div>
  );
}

function FlipCard() {
  return (
    <div className="m-11 flip-card w-48 h-72 bg-transparent perspective-1000 font-sans">
      <div className="flip-card-inner relative w-full h-full text-center transition-transform duration-700">
        <div className="flip-card-front absolute flex flex-col justify-between w-full h-full bg-white shadow-md">
          <span className="card-offer-span"></span>
          <img
            className="card-img w-7/12 mx-auto"
            src="https://thumb.pccomponentes.com/w-530-530/articles/35/357848/1157-msi-geforce-rtx-3060-ventus-2x-oc-12gb-gddr6.jpg"
            alt=""
          />
          <p className="card-name text-left mx-2 text-xs">
            MSI GeForce RTX 3060 VENTUS 2X OC LHR 12GB GDDR6
          </p>
          <div className="flex m-2">
            <MdOutlineStarPurple500 />
            <MdOutlineStarPurple500 />
            <MdOutlineStarPurple500 />
            <MdOutlineStarPurple500 />
            <MdOutlineStarPurple500 />
          </div>
          <div className="card-prices-container flex">
            <p className="card-price font-extrabold m-2 text-sm">294,99€</p>
            <p className="card-price-offer font-light text-xs self-center line-through ml-1">
              294,99€
            </p>
          </div>
          <div className="card-button relative text-white p-1 mx-2 my-2 rounded flex justify-center items-center cursor-pointer ">
            <span className="tooltip absolute top-0 text-xs  text-white p-1 rounded shadow opacity-0 pointer-events-none transition-all duration-300 ease-in-out">
              294,99€
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
            <li className="card-city list-none my-1 text-left mx-2 flex items-center">
              <img
                className="icon w-4 mr-1"
                src={iconLocation}
                alt="icon location"
              />
              Barcelona
            </li>
            <li className="card-city list-none my-1 text-left mx-2 flex items-center">
              <img
                className="icon w-4 mr-1"
                src={iconLocation}
                alt="icon location"
              />
              Madrid
            </li>
            <li className="card-city list-none my-1 text-left mx-2 flex items-center">
              <img
                className="icon w-4 mr-1"
                src={iconLocation}
                alt="icon location"
              />
              Valencia
            </li>
            <li className="card-city list-none my-1 text-left mx-2 flex items-center">
              <img
                className="icon w-4 mr-1"
                src={iconLocation}
                alt="icon location"
              />
              Sevilla
            </li>
            <li className="card-city list-none my-1 text-left mx-2 flex items-center">
              <img
                className="icon w-4 mr-1"
                src={iconLocation}
                alt="icon location"
              />
              A Coruña
            </li>
            <li className="card-city list-none my-1 text-left mx-2 flex items-center">
              <img
                className="icon w-4 mr-1"
                src={iconLocation}
                alt="icon location"
              />
              Segovia
            </li>
            <li className="card-city list-none my-1 text-left mx-2 flex items-center">
              <img
                className="icon w-4 mr-1"
                src={iconLocation}
                alt="icon location"
              />
              Córdoba
            </li>
            <li className="card-city list-none my-1 text-left mx-2 flex items-center">
              <img
                className="icon w-4 mr-1"
                src={iconLocation}
                alt="icon location"
              />
              Sevilla
            </li>
            <li className="card-city list-none my-1 text-left mx-2 flex items-center">
              <img
                className="icon w-4 mr-1"
                src={iconLocation}
                alt="icon location"
              />
              Cádiz
            </li>
          </ul>
          <ScrollIndicator elementId="store-list" />
          <div className="card-button relative text-white p-1 mx-2 my-2 rounded flex justify-center items-center cursor-pointer">
            <span className="tooltip absolute top-0 text-xs  text-white p-1 rounded shadow opacity-0 pointer-events-none transition-all duration-300 ease-in-out">
              294,99€
            </span>
            <span> Añadir al carrito </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlipCard;
