// ComparatorFlipCard.tsx
import { useTranslation } from "react-i18next";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FaCodeCompare } from "react-icons/fa6";
import type { Product } from "../models/product";
import "../styles/comparator-flip-card.css";

interface FlipCardProps {
  product: Product;
  onAddToComparator: (product: Product) => void;
}

const ComparatorFlipCard: React.FC<FlipCardProps> = ({
  product,
  onAddToComparator,
}) => {
  const { t } = useTranslation("global");
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
      onClick={() => onAddToComparator(product)}
      className="comparator-flip-card bg-transparent perspective-1000 font-sans cursor-pointer"
    >
      <div className="comparator-flip-card-inner relative w-full h-full text-center transition-transform duration-700">
        <div className="comparator-flip-card-front absolute flex flex-col w-full h-full bg-white shadow-md">
          {product.offer && (
            <span className="comparator-card-offer-span"></span>
          )}
          <div className="comparator-cardContainer">
            <div className="comparator-topCard">
              <div className="comparator-imgCard">
                <img
                  className="comparator-card-img mx-auto"
                  src={product.imageUrl}
                  alt={product.name}
                />
              </div>
              <div className="comparator-compareIcon">
                <FaCodeCompare />
              </div>
            </div>
            <div className="comparator-cardInfo">
              <p className="comparator-card-name text-left mx-2 text-xs">
                {product.name}
              </p>
              <div className="comparator-card-prices-container flex">
                <p className="comparator-card-price">
                  {(product.price * (1 - product.discount / 100)).toFixed(2)}€
                </p>
                {product.discount > 0 && (
                  <p className="comparator-card-price-offer font-light text-xs line-through">
                    {product.price.toFixed(2)}€
                  </p>
                )}
              </div>
              <div className="comparator-starsIcon">
                {generateStars(product.rating)}
              </div>
            </div>
          </div>
          <div className="comparator-bottomCard">
            <button
              onClick={() => onAddToComparator(product)}
              className="comparator-card-button relative text-white p-1 mx-2 my-2 rounded flex justify-center items-center cursor-pointer"
            >
              <span className="comparator-tooltip absolute top-0 text-xs text-white p-1 rounded shadow opacity-0 pointer-events-none transition-all duration-300 ease-in-out">
                {(product.price * (1 - product.discount / 100)).toFixed(2)}€
              </span>
              <span>{t("comparator.add_component")}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparatorFlipCard;
