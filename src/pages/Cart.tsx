import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaTrash } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import LanguageSwitcher from "../components/LanguageSwitcher";
import Loading from "../components/Loading";
import Navbar2 from "../components/NavBar2";
import ProductCard from "../components/ProductCard";
import "../styles/cart.css";
import { supabaseClient } from "../utils/supabaseClient";

const Cart = () => {
  const [userCart, setUserCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation("global");
  const [formattedDeliveryDate, setFormattedDeliveryDate] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        // Obtener datos del usuario
        const { data: userData, error: userError } =
          await supabaseClient.auth.getUser();
        if (userError) {
          throw new Error(userError.message);
        }

        const userId = userData.user.id; // Obtener el userId del usuario

        // Obtener el carrito del usuario desde Supabase
        const { data: profileData, error: profileError } = await supabaseClient
          .from("profiles")
          .select("cart")
          .eq("id", userId)
          .single();

        if (profileError) {
          throw new Error(profileError.message);
        }

        const cartItems = profileData.cart || [];

        // Contar las ocurrencias de cada productId
        const itemCounts = cartItems.reduce((acc, productId) => {
          acc[productId] = (acc[productId] || 0) + 1;
          return acc;
        }, {});

        // Obtener datos de productos basados en los IDs del carrito
        const promises = Object.keys(itemCounts).map(async (productId) => {
          const response = await fetch(
            `http://localhost:3000/products/${productId}`
          );
          if (!response.ok) {
            throw new Error(`Failed to fetch product with ID ${productId}`);
          }
          const productData = await response.json();

          return {
            ...productData,
            deliveryDate: formattedDeliveryDate, // Placeholder, será actualizado en el efecto
            quantity: itemCounts[productId],
          };
        });

        const products = await Promise.all(promises);
        setUserCart(products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user cart:", error.message);
        setLoading(false);
      }
    }

    fetchData();
  }, [formattedDeliveryDate]); // Actualizar cuando formattedDeliveryDate cambie

  useEffect(() => {
    // Generar una fecha de entrega fija de 3 días desde hoy
    const deliveryDays = 3;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);

    // Obtener los días de la semana y meses traducidos
    const daysOfWeek = [
      t("daysOfWeek.Sunday"),
      t("daysOfWeek.Monday"),
      t("daysOfWeek.Tuesday"),
      t("daysOfWeek.Wednesday"),
      t("daysOfWeek.Thursday"),
      t("daysOfWeek.Friday"),
      t("daysOfWeek.Saturday"),
    ];
    const months = [
      t("months.January"),
      t("months.February"),
      t("months.March"),
      t("months.April"),
      t("months.May"),
      t("months.June"),
      t("months.July"),
      t("months.August"),
      t("months.September"),
      t("months.October"),
      t("months.November"),
      t("months.December"),
    ];

    // Formatear la fecha
    const newFormattedDeliveryDate = `${t("product.receive")} ${
      daysOfWeek[deliveryDate.getDay()]
    }, ${months[deliveryDate.getMonth()]} ${deliveryDate.getDate()}`;

    setFormattedDeliveryDate(newFormattedDeliveryDate);
  }, [i18n.language, t]); // Recalcular la fecha cuando cambie el idioma

  // Calcular el precio total de todos los productos en el carrito
  const totalPrice = userCart.reduce((total, product) => {
    return total + parseFloat(product.finalPrice) * product.quantity;
  }, 0);

  // Función para vaciar el carrito
  const emptyCart = async () => {
    try {
      const { data: userData, error: userError } =
        await supabaseClient.auth.getUser();
      if (userError) {
        throw new Error(userError.message);
      }

      const userId = userData.user.id;

      // Llamar a la API para vaciar el carrito
      const response = await fetch(
        `http://localhost:3000/users/empty-cart/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to empty cart");
      }

      // Vaciar el carrito localmente
      setUserCart([]);
    } catch (error) {
      console.error("Error emptying cart:", error.message);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const { data: userData, error: userError } =
        await supabaseClient.auth.getUser();
      if (userError) {
        throw new Error(userError.message);
      }

      const userId = userData.user.id;

      // Obtener el carrito del usuario desde Supabase
      const { data: profileData, error: profileError } = await supabaseClient
        .from("profiles")
        .select("cart")
        .eq("id", userId)
        .single();

      if (profileError) {
        throw new Error(profileError.message);
      }

      const cartItems = profileData.cart || [];
      const productIndex = cartItems.indexOf(productId);

      if (productIndex !== -1) {
        cartItems.splice(productIndex, 1); // Eliminar solo una instancia del producto
      }

      // Actualizar el carrito del usuario en Supabase
      const { error } = await supabaseClient
        .from("profiles")
        .update({ cart: cartItems })
        .eq("id", userId);

      if (error) {
        throw new Error(error.message);
      }

      // Actualizar el carrito localmente
      const newCart = [...userCart];
      const localProductIndex = newCart.findIndex(
        (product) => product.id === productId
      );
      if (localProductIndex !== -1) {
        if (newCart[localProductIndex].quantity > 1) {
          newCart[localProductIndex].quantity -= 1;
        } else {
          newCart.splice(localProductIndex, 1);
        }
      }
      setUserCart(newCart);
    } catch (error) {
      console.error("Error removing item from cart:", error.message);
    }
  };

  const navigate = useNavigate();

  const goToCategories = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <p>
        <Loading />
      </p>
    );
  }

  return (
    <>
      <Navbar2 />
      <div className="cart-title-container">
        <h5>{t("cart.title")}</h5>
        <p>
          {userCart.length} {t("cart.items")}
        </p>
      </div>
      <div className="cart-container">
        <div className="cart-content-container">
          <div
            className={
              userCart.length === 0
                ? "cart-empty-cart-container"
                : "cart-empty-cart-container-hidden"
            }
          >
            <h5>{t("cart.title")}</h5>
            <FiShoppingCart className="cart-icon-cart" />
          </div>
          <div
            className={
              userCart.length === 0 ? "cart-items-hidden" : "cart-items"
            }
          >
            {userCart.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                onRemove={removeFromCart}
              />
            ))}
            <div
              className={
                userCart.length === 0 ? "cart-actions-hidden" : "cart-actions"
              }
            >
              <button onClick={goToCategories}>
                <p>{t("cart.button_keep")}</p>
              </button>
              <button className="cart-empty-cart-button" onClick={emptyCart}>
                <FaTrash className="cart-trash-icon" />
                <p>{t("cart.button_empty")}</p>
              </button>
            </div>
          </div>
        </div>
        <div className="cart-summary">
          <h2>{t("cart_float.summary")}</h2>
          {userCart.length === 0 ? (
            <p>{t("cart.no_items")}</p>
          ) : (
            <>
              <p>{userCart[0]?.deliveryDate}</p>
              <div className="cart-total">Total: {totalPrice.toFixed(2)}€</div>
            </>
          )}
          <button>
            <h6>{t("cart.button_purchase")}</h6>
          </button>
        </div>
      </div>
      <LanguageSwitcher />
      <Footer />
    </>
  );
};

export default Cart;
