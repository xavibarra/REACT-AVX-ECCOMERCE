import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaTruck } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import "../styles/cardAddCartProduct.css";

const CardAddCartProduct = ({ tiendas, price }) => {
  const [deliveryDate, setDeliveryDate] = useState("");
  const { t } = useTranslation("global");

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
        <button className="bg-primary-color cardAddCartButton">
          {t("product.add")}
        </button>
      </div>
    </aside>
  );
};

export default CardAddCartProduct;
