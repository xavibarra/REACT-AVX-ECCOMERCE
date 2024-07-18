import { useEffect, useState } from "react";
import { supabaseClient } from "../utils/supabaseClient";
import ProductCard from "../components/ProductCard";
import "../styles/float.cart.css";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const FloatCart = ({ className }) => {
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

                    // Generar una fecha de entrega fija de 3 días desde hoy
                    const deliveryDays = 3;
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

    // Calcular el precio total de todos los productos en el carrito
    const totalPrice = userCart.reduce((total, product) => {
        return total + (parseFloat(product.finalPrice) * product.quantity);
    }, 0);

    const removeFromCart = async (productId) => {
        try {
            const { data: userData, error: userError } = await supabaseClient.auth.getUser();
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
            const localProductIndex = newCart.findIndex(product => product.id === productId);
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

    const goToCart = () => {
        navigate("/cart");
    };

    if (loading) {
        return <Loading/>
    }

    return (
        <div className={className}>
            <div className="float-cart-title-container">
                <h5>My cart</h5>
                <p>{userCart.length} items</p>
            </div>
            <div className="float-cart-content-container">
                {userCart.length === 0 ? (
                    <div className="float-cart-empty-cart-container">
                        <h5>There are no items in the Cart</h5>
                        <FiShoppingCart className="float-cart-icon-cart" />
                    </div>
                ) : (
                    userCart.map((product, index) => (
                        <ProductCard key={index} product={product} onRemove={removeFromCart} />
                    ))
                )}
            </div>
            <div className="float-cart-summary">
                <h2>Summary</h2>
                {userCart.length === 0 ? (
                    <p>No items in the cart</p>
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
                    <button onClick={goToCart}>View items in your basket</button>
                </div>
            </div>
        </div>
    );
}

export default FloatCart;
