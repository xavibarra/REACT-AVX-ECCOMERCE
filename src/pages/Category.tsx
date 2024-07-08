import React from "react";
import { useParams } from "react-router-dom";
import { Product } from "../models/product";

import gifff from "../assets/img/gifanimado.gif";
import FlipCard from "../components/FlipCard";
import Loading from "../components/Loading";

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
        setProducts(data);
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

  if (loading) return <Loading/>;
  if (error) return <p>Error: {error}</p>;
  console.log(products);
  return (
    <div>
      <h1>Productos en la categoría: {categoryId}</h1>
      <div className="">
        {products.map((product) => (
          <FlipCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Category;
