import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "../styles/float.cart.css";
import { FiShoppingCart } from "react-icons/fi";
import Loading from "./Loading";
import { IoClose } from "react-icons/io5";
import useCart from "../components/useCart"; // Importa el hook personalizado
import { supabaseClient } from "../utils/supabaseClient";
import { useEffect } from "react";

interface FloatCartProps {
    className: string;
    setFloatCartVisible: (visible: boolean) => void;
}

const FloatCart = ({ className, setFloatCartVisible }: FloatCartProps) => {
    const { userCart, setUserCart, loading, fetchCart } = useCart(); // Usa el hook

    // Ejecuta fetchCart después de cada cambio en el carrito
    useEffect(() => {
        fetchCart();
    }, [userCart]);

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

    const closeFloatCart = () => {
        setFloatCartVisible(false);
    };

    if (loading) {
        return <Loading />;
    }

    const totalPrice = userCart.reduce((total, product) => {
        return total + (parseFloat(product.finalPrice) * product.quantity);
    }, 0);

    return (
        <div id="float-cart-container" className={className}>
            <div className="float-cart-title-container">
                <div>
                    <h5>My cart</h5>
                    <p>{userCart.length} items</p>
                </div>
                <div className="float-cart-close-icon-container">
                    <IoClose className="float-cart-close-icon" onClick={closeFloatCart} />
                </div>
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
};

export default FloatCart;
