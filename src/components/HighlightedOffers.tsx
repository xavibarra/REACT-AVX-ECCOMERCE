import { useEffect, useState } from "react";
import { Product } from "../models/product";

import FlipCard from "./FlipCard";

function HighlightedOffers() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOfferProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products/offer");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOfferProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  console.log(products);
  return (
    <div>
      <h1>Products on Offer</h1>
      <div className="">
        {products.map((product) => (
          <FlipCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default HighlightedOffers;
