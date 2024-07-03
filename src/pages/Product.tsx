import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import type { Product } from "../models/product";

const Product = () => {
  const { productId } = useParams<{ productId: string }>(); // Obtener `productId` de la URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/products/${productId}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Product Details</h2>
      {product ? (
        <div>
          <p>Product Name: {product.name}</p>
          {/* Más detalles del producto aquí */}
        </div>
      ) : (
        <p>No product found with ID {productId}</p>
      )}
    </div>
  );
};

export default Product;
