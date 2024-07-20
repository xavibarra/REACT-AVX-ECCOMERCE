import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "../styles/float.cart.css";
import { FiShoppingCart } from "react-icons/fi";
import Loading from "./Loading";
import { IoClose } from "react-icons/io5";
import { supabaseClient } from "../utils/supabaseClient";
import { useEffect, useContext, useState } from "react";
import { FloatCartContext } from "./SetFloatCartVisibleContext";

interface Product {
  id: string;
  finalPrice: string;
  deliveryDate: string;
  quantity: number;
  imageUrl: string;
  name: string;
  [key: string]: any;
}
import { useTranslation } from "react-i18next";

interface FloatCartProps {
  className?: string;
}

const FloatCart = ({ className }: FloatCartProps) => {
  const context = useContext(FloatCartContext);
  if (!context) {
    throw new Error('FloatCart must be used within a FloatCartProvider');
  }

  const { isFloatCartVisible, setFloatCartVisible, userCart, fetchCart } = context;
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation("global");

  useEffect(() => {
    fetchCart().then(() => setLoading(false));
  }, [fetchCart]);

  const removeFromCart = async (productId: string) => {
    try {
      const { data: userData, error: userError } = await supabaseClient.auth.getUser();
      if (userError) {
        throw new Error(userError.message);
      }

  const userId = userData.user.id;

      const { data: profileData, error: profileError } = await supabaseClient
        .from("profiles")
        .select("cart")
        .eq("id", userId)
        .single();

      if (profileError) {
        throw new Error(profileError.message);
      }

      const cartItems: string[] = profileData.cart || [];
      const productIndex = cartItems.indexOf(productId);

      if (productIndex !== -1) {
        cartItems.splice(productIndex, 1); // Eliminar solo una instancia del producto
      }

      const { error } = await supabaseClient
        .from("profiles")
        .update({ cart: cartItems })
        .eq("id", userId);

      if (error) {
        throw new Error(error.message);
      }

      fetchCart(); // Actualiza el carrito
    } catch (error) {
      console.error("Error removing item from cart:", error.message);
    }
  };

  const navigate = useNavigate();

  const goToCart = () => {
    navigate("/cart");
    setFloatCartVisible(false);
  };

  const closeFloatCart = () => {
    setFloatCartVisible(false);
  };

  if (loading) { // Asegúrate de que "loading" esté chequeando el estado de carga correcto
    return <Loading />;
  }

  const totalPrice = userCart.reduce((total, product) => {
    return total + (parseFloat(product.finalPrice) * product.quantity);
  }, 0);

  return (
    <div id="float-cart-container" className={isFloatCartVisible ? 'float-cart-container' : 'float-cart-container-hidden'}>
      <div className="float-cart-title-container">
        <div>
          <h5>{t("cart_float.title")}</h5>
          <p>
            {userCart.length} {t("cart_float.items")}
          </p>
        </div>
        <div className="float-cart-close-icon-container">
          <IoClose className="float-cart-close-icon" onClick={closeFloatCart} />
        </div>
      </div>
      <div className="float-cart-content-container">
        {userCart.length === 0 ? (
          <div className="float-cart-empty-cart-container">
            <h5>There ara no items in the cart</h5>
            <FiShoppingCart className="float-cart-icon-cart" />
          </div>
        ) : (
          userCart.map((product, index) => (
            <ProductCard key={index} product={product} onRemove={removeFromCart} />
          ))
        )}
      </div>
      <div className="float-cart-summary">
        <h2>{t("cart_float.summary")}</h2>
        {userCart.length === 0 ? (
          <p>{t("cart_float.title")}</p>
        ) : (
          <>
            <p>{userCart[0]?.deliveryDate}</p>
            <div className="float-cart-total-container">
              <div className="float-cart-total">Total:</div>
              <div><h6>{totalPrice.toFixed(2)}€</h6></div>
            </div>
          </>
        )}
        <div className="float-cart-buttons">
          <button onClick={goToCart}>{t("cart_float.button")}</button>
        </div>
      </div>
    </div>
  );
};

export default FloatCart;
