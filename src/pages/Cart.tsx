import { useEffect, useState } from "react";
import { supabaseClient } from "../utils/supabaseClient";
import ProductCard from "../components/ProductCard";
import "../styles/cart.css";
import { FaTrash } from "react-icons/fa";


const Cart = () => {
  const [userCart, setUserCart] = useState([]);
  const [loading, setLoading] = useState(true);

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

          // Generar una fecha de entrega aleatoria entre 5 y 20 días desde hoy
          const deliveryDays = Math.floor(Math.random() * 16) + 5;
          const deliveryDate = new Date();
          deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);

          // Formatear la fecha
          const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          const formattedDeliveryDate = `Receive it on ${daysOfWeek[deliveryDate.getDay()]}, ${months[deliveryDate.getMonth()]} ${deliveryDate.getDate()}`;

          return {
            ...productData,
            deliveryDate: formattedDeliveryDate,
            quantity: itemCounts[productId]
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
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  const totalPrice = userCart.reduce((total, product) => {
    return total + (parseFloat(product.final_price) * product.quantity);
  }, 0);

  return (
    <div className="cart-container">
      <div className="cart-title-container">
        <h5>My cart</h5>
        <p>{userCart.length} items</p>
      </div>
      <div className="cart-content-container">
        <div className="cart-items">
          {userCart.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
          <div className="cart-actions">
            <button><p>Keep buying</p></button>
            <button className="cart-empty-cart-button"><FaTrash className="cart-trash-icon" /><p>Empty cart</p></button>
          </div>
        </div>
        <div className="cart-summary">
          <h2>Summary</h2>
          <p>Receive everything on {userCart[0]?.deliveryDate}</p>
          <div className="cart-total">Total: {totalPrice.toFixed(2)}€</div>
          <button>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
