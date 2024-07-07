import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CardAddCartProduct from "../components/CardAddCartProduct";
import type { FeaturesValues } from "../models/featuresValues";
import type { Product } from "../models/product";

const Product = () => {
  const { productId } = useParams<{ productId: string }>(); // Obtener `productId` de la URL
  const [product, setProduct] = useState<Product | null>(null);
  const [featuresValues, setFeaturesValues] = useState<FeaturesValues[]>([]);
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

        // Llamar a la función para obtener características y valores después de obtener el producto
        fetchFeaturesValues(productId);
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

  const fetchFeaturesValues = async (productId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/values/features/${productId}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data: FeaturesValues[] = await response.json();
      setFeaturesValues(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Product Details</h2>
      {product ? (
        <div>
          <p>Product Name: {product.name}</p>
          <p>Category ID: {product.categoryId}</p>
          <h3>Features and Values:</h3>
          <ul>
            {featuresValues.map((featureValue) => (
              <li key={featureValue.id_feature}>
                <strong>{featureValue.feature_name_es}:</strong>{" "}
                {featureValue.value}
              </li>
            ))}
          </ul>
          {/* Otros detalles del producto aquí */}
        </div>
      ) : (
        <p>No product found with ID {productId}</p>
      )}
      <CardAddCartProduct></CardAddCartProduct>
    </div>
  );
};

export default Product;
