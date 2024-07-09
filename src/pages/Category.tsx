import React from "react";
import { useParams } from "react-router-dom";
import type { Category } from "../models/category";
import { Product } from "../models/product";

import FlipCard from "../components/FlipCard";
import Loading from "../components/Loading";
import Navbar2 from "../components/NavBar2";
import "../styles/category.css";

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = React.useState<Product[]>([]);
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

        // Fetch category for each product sequentially
        const productsWithCategory = [];
        for (const product of data) {
          const category = await fetchCategory(product.categoryId);
          productsWithCategory.push({ ...product, category });
        }

        setProducts(productsWithCategory);
      } catch (error) {
        setError(
          "Error al obtener los productos. Inténtelo de nuevo más tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchProductsByCategory();
    }
  }, [categoryId]);

  const fetchCategory = async (categoryId: number): Promise<Category> => {
    const response = await fetch(
      `http://localhost:3000/categories/${categoryId}`
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data: Category = await response.json();
    console.log(data);
    return data;
  };

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Navbar2 />
      <RepeatedTitle text="GRAPHIC CARDS" />
      <div className="categoryProducts">
        {products.map((product) => (
          <FlipCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

const RepeatedTitle = ({ text }) => {
  const repeatedText = new Array(10).fill(text).join(" ");

  return (
    <div className="title-container">
      <div className="title">{repeatedText}</div>
    </div>
  );
};

export default Category;
