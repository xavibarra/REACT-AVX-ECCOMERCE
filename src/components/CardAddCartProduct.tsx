import { FaTruck } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";

import "../styles/cardAddCartProduct.css";
// ({product}:{product:Product}
const CardAddCartProduct = () => {
  return (
    <aside className="cardAddCartSection ">
      <div>
        <p className="cardAddCartPrice">294,99€</p>
      </div>
      <div className="cardAddCartContainer">
        <div>
          <FaTruck className="cardAddCartIcon" />
        </div>
        <div className="cardAddCartSubContainer">
          <div>
            <p>Envío:Gratis</p>
          </div>
          <div>
            <p className="text-primary-color">
              Recíbelo el miércoles 3 de Julio
            </p>
          </div>
        </div>
      </div>
      <div className="cardAddCartContainer">
        <div>
          <FaShop className="cardAddCartIcon" />
        </div>
        <div>
          <div className="cardAddCartSubContainer">
            <p>Disponible en las tiendas:</p>
          </div>
          <div>
            <p className="text-primary-color">Madrid, Barcelona, Mallorca</p>
          </div>
        </div>
      </div>
      <div className="cardAddCartButtonContainer">
        <button className="bg-primary-color cardAddCartButton">
          Añadir al carrito
        </button>
      </div>
    </aside>
  );
};

export default CardAddCartProduct;
