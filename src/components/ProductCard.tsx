import { FaTrash } from "react-icons/fa";
import "../styles/product-card.css"

const ProductCard = ({ product }) => {
  const finalPrice = parseFloat(product.finalPrice);
  const formattedFinalPrice = !isNaN(finalPrice) ? finalPrice.toFixed(2) : 'N/A';

  return (
    <div className="product-card-container">
      <div>
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="product-card-details">
        <h4>{product.name}</h4>
        <div className="product-card-price-quantity">
          <h4>{formattedFinalPrice}€</h4>
          <h4 className="quantity">x{product.quantity}</h4>
        </div>
        <div className="product-card-delivery">
          {product.deliveryDate}
        </div>
      </div>
      <div className="product-card-trash">
        <FaTrash />
      </div>
    </div>
  );
};

export default ProductCard;
