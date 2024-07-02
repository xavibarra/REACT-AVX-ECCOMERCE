import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../models/product"; // Asegúrate de la ruta correcta aquí

const Category: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

  return (
    <div>
      <h1>Productos en la categoría: {categoryId}</h1>
      {loading && <p>Cargando productos...</p>}
      {error && <p>Error: {error}</p>}
      <div className="product-cards-container">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3 className="product-name">{product.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
