import { useEffect, useState } from "react";
import { supabaseClient } from "../utils/supabaseClient";

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

        // Obtener nombres de productos basados en los IDs del carrito
        const promises = cartItems.map(async (productId) => {
          const response = await fetch(
            `http://localhost:3000/products/${productId}`
          );
          if (!response.ok) {
            throw new Error(`Failed to fetch product with ID ${productId}`);
          }
          const productData = await response.json();
          return productData.name;
        });

        const productNames = await Promise.all(promises);
        setUserCart(productNames);
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

  return (
    <div>
      <h2>User Cart:</h2>
      <ul>
        {userCart.map((productName, index) => (
          <li key={index}>{productName}</li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
