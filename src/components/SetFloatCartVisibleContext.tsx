import { createContext, useState, ReactNode, FC, useEffect } from 'react';
import { supabaseClient } from "../utils/supabaseClient";

interface Product {
  id: string;
  finalPrice: string;
  deliveryDate: string;
  quantity: number;
  imageUrl: string;
  name: string;
  [key: string]: any;
}

interface FloatCartContextType {
  isFloatCartVisible: boolean;
  setFloatCartVisible: (visible: boolean) => void;
  userCart: Product[];
  fetchCart: () => Promise<void>;
}

export const FloatCartContext = createContext<FloatCartContextType | undefined>(undefined);

interface FloatCartProviderProps {
  children: ReactNode;
}

export const FloatCartProvider: FC<FloatCartProviderProps> = ({ children }) => {
  const [isFloatCartVisible, setIsFloatCartVisible] = useState(false);
  const [userCart, setUserCart] = useState<Product[]>([]);

  const setFloatCartVisible = (visible: boolean) => {
    setIsFloatCartVisible(visible);
  };

  const fetchCart = async (): Promise<void> => {
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

      const itemCounts = cartItems.reduce<{ [key: string]: number }>((acc, productId) => {
        acc[productId] = (acc[productId] || 0) + 1;
        return acc;
      }, {});

      const promises = Object.keys(itemCounts).map(async (productId) => {
        const response = await fetch(
          `http://localhost:3000/products/${productId}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch product with ID ${productId}`);
        }
        const productData = await response.json();

        const deliveryDays = 3;
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);

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
    } catch (error) {
      console.error("Error fetching user cart:", error.message);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <FloatCartContext.Provider value={{ isFloatCartVisible, setFloatCartVisible, userCart, fetchCart }}>
      {children}
    </FloatCartContext.Provider>
  );
};
