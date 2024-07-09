import React from "react";
import { useParams } from "react-router-dom";
import { Product } from "../models/product";

import FlipCard from "../components/FlipCard";
import Loading from "../components/Loading";
import Navbar2 from "../components/NavBar2";
import "../styles/category.css";
import Footer from "../components/Footer";

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = React.useState<Product[]>([]);
  const [categoryName, setCategoryName] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `http://localhost:3000/products/productsByCategory/${categoryId}`
        );

        if (!response.ok) {
          throw new Error("Error al obtener los productos.");
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        setError(
          "Error al obtener los productos. Inténtelo de nuevo más tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    const fetchCategoryName = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/categories/${categoryId}`
        );

        if (!response.ok) {
          throw new Error("Error al obtener el nombre de la categoría.");
        }
        const data = await response.json();
        setCategoryName(data.category_name_en);
        console.log(categoryName);
      } catch (error) {
        setError(
          "Error al obtener el nombre de la categoría. Inténtelo de nuevo más tarde."
        );
      }
    };
    if (categoryId) {
      fetchProductsByCategory();
      fetchCategoryName();
    }
  }, [categoryId]);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Navbar2 />
      <RepeatedTitle text="GRAPHIC CARDS" />
      <div className="filterOrder">
        <button>Lowest price</button>
        <button>Highest price</button>
        <button>Best rated</button>
        <button>Offers</button>
        <button>Name</button>
      </div>
      <div className="categoryProducts">
        {products.map((product) => (
          <FlipCard key={product.id} product={product} />
        ))}
      </div>
      <Footer/>
    </div>
  );
};

const RepeatedTitle = ({ text }) => {
  const repeatedText = new Array(10).fill(text).join(" ");

  return (
    <div className="title">
      <p>{repeatedText}</p>
    </div>
  );
};

export default Category;
