import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaTruck } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import "../styles/cardAddCartProduct.css";
import { supabaseClient } from "../utils/supabaseClient";
import { FloatCartContext } from "./SetFloatCartVisibleContext";

interface CardAddCartProductProps {
  tiendas: string[];
  price: string;
  productId: string; // Nueva prop para la ID del producto
}

const CardAddCartProduct = ({
  tiendas,
  price,
  productId,
}: CardAddCartProductProps) => {
  const [deliveryDate, setDeliveryDate] = useState("");
  const context = useContext(FloatCartContext);
  const { setFloatCartVisible, fetchCart } = context;
  const { t } = useTranslation("global");
  const navigate = useNavigate();

  useEffect(() => {
    // Calcular la fecha tres días posteriores al actual
    const today = new Date();
    const deliveryDay = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000); // Sumar 3 días en milisegundos

    // Definir las opciones de formato utilizando `as const` para asegurar tipos literales
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
    } as const; // Asegura que los tipos sean tratados como literales específicos

    const formattedDeliveryDay = deliveryDay.toLocaleDateString(
      "en-EN",
      options
    );

    setDeliveryDate(formattedDeliveryDay);
  }, []);

  const handleAddToCartClick = async (event: React.MouseEvent) => {
    event.stopPropagation();

    try {
      const { data, error } = await supabaseClient.auth.getUser();
      if (error) {
        console.error("Error fetching user data:", error);
        navigate("/login"); // Redirige a la página de inicio de sesión
        return;
      }

      const userId = data.user.id;

      const response = await fetch("http://localhost:3000/users/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId }), // Usar la ID del producto pasada como prop
      });

      if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }

      const result = await response.json();
      console.log(result.message); // Aquí puedes manejar la respuesta del backend

      setFloatCartVisible(true); // Usa el contexto para mostrar el carrito
      fetchCart(); // Actualiza el carrito
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
    }
  };

  return (
    <aside className="cardAddCartSection">
      <div>
        <p className="cardAddCartPrice">{price}€</p>
      </div>
      <div className="cardAddCartContainer">
        <div>
          <FaTruck className="cardAddCartIcon" />
        </div>
        <div className="cardAddCartSubContainer">
          <div className="infoTitle">
            <p>{t("product.shipping")}</p>
          </div>
          <div>
            <p className="text-primary-color">
              {t("product.receive")} {deliveryDate}
            </p>
          </div>
        </div>
      </div>
      <div className="cardAddCartContainer">
        <div>
          <FaShop className="cardAddCartIcon" />
        </div>
        <div>
          <div className="cardAddCartSubContainer infoTitle">
            <p>{t("product.stock")}</p>
          </div>
          <div>
            <p className="text-primary-color">{tiendas.join(", ")}</p>
          </div>
        </div>
      </div>
      <div className="cardAddCartButtonContainer">
        <button
          className="bg-primary-color cardAddCartButton"
          onClick={handleAddToCartClick}
        >
          {t("product.add")}
        </button>
      </div>
    </aside>
  );
};

export default CardAddCartProduct;
