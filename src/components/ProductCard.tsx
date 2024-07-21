import { FaTrash } from "react-icons/fa";
import "../styles/product-card.css";

interface ProductCardProps {
  product: {
    id: string;
    imageUrl: string;
    name: string;
    finalPrice: string;
    quantity: number;
    deliveryDate: string;
  };
  onRemove: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onRemove }) => {
  const finalPrice = parseFloat(product.finalPrice);
  const formattedFinalPrice = !isNaN(finalPrice)
    ? finalPrice.toFixed(2)
    : "N/A";

  return (
    <div className="product-card-container">
      <div className="product-card-img-container">
        <img
          className="product-card-img"
          src={product.imageUrl}
          alt={product.name}
        />
      </div>
      <div className="product-card-details">
        <h4>{product.name}</h4>
        <div className="product-card-price-quantity">
          <h4>{formattedFinalPrice}€</h4>
          <h4 className="quantity">x{product.quantity}</h4>
        </div>
        <div className="product-card-delivery">{product.deliveryDate}</div>
      </div>
      <div className="product-card-trash" onClick={() => onRemove(product.id)}>
        <FaTrash />
      </div>
    </div>
  );
};

export default ProductCard;
