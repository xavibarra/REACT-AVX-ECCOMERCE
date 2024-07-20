import React from "react";
import { FloatCartProvider } from "./components/SetFloatCartVisibleContext";
import Navbar from "./components/NavBar";
import Navbar2 from "./components/NavBar2";
import FloatCart from "./components/FloatCart";
import FlipCard from "./components/FlipCard";

const App: React.FC = () => {

  const exampleProduct = {
    id: "1",
    name: "Example Product",
    imageUrl: "https://via.placeholder.com/150",
    price: 100,
    discount: 10,
    rating: 4.5,
    offer: true,
    categories: {
      category_description_en: "Example Category",
    },
  };

  return(
    <FloatCartProvider>
      <div>
        <Navbar />
        <Navbar2 />
        <FloatCart className="float-cart-container" />
        <FlipCard product={exampleProduct}/>
      </div>
    </FloatCartProvider>
  );
};

export default App;
