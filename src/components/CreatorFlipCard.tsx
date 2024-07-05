import "../styles/creatorflipcard.css";
import { MdOutlineStarPurple500 } from "react-icons/md";


const CreatorFlipCard = ({name, foto, descripcion, offer}) => {

    return(
      <div className="m-11 flip-card w-48 h-72 bg-transparent perspective-1000 font-sans cursor-pointer">
      <div className="flip-card-inner relative w-full h-full text-center transition-transform duration-700">
        <div className="flip-card-front creator-flip-card-front absolute flex flex-col w-full h-full bg-white shadow-md">
          {offer && <span className="card-offer-span"></span>}
          <img src = {foto}/>
          <p className="card-name text-left mx-2 text-xs">{name}</p>
          <div className="flex m-2">
            {[...Array(5)].map((_, index) => (
              <MdOutlineStarPurple500 className="creator-star-icon" key={index} />
            ))}
          </div>
          <div className="card-prices-container flex">
            <p className="card-price font-extrabold m-2 text-sm">
              {( (1)).toFixed(2)}€
            </p>

          </div>
          <div className="card-button creator-card-button relative text-white p-1 mx-2 my-2 rounded flex justify-center items-center cursor-pointer">
            <span className="creator-relleno-span"></span>
            <span className="tooltip absolute top-0 text-xs text-white p-1 rounded shadow opacity-0 pointer-events-none transition-all duration-300 ease-in-out">
              {}€
            </span>
            <span> Añadir al carrito </span>
          </div>
        </div>
        <div className="flip-card-back creator-flip-card-back absolute flex flex-col justify-end w-full h-full bg-white shadow-md transform rotate-y-180">
          <p
            className="creator-description overflow-y-auto hide-scrollbar relative"
            id="store-list"
          >
            {descripcion}
          </p>
          


          <div className="card-button relative text-white p-1 mx-2 my-2 rounded flex justify-center items-center cursor-pointer">
            <span className="tooltip absolute top-0 text-xs text-white p-1 rounded shadow opacity-0 pointer-events-none transition-all duration-300 ease-in-out">
              {}€
            </span>
            <span> Añadir al carrito </span>
          </div>
        </div>
      </div>
    </div>
    )
};


export default CreatorFlipCard;