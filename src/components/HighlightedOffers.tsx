import { useEffect, useState } from "react";
import Carousel from "react-grid-carousel";
import { Product } from "../models/product";

import "../styles/HighlightedOffers.css";
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
    <section className="hightighlighted-offers-container">
      <h2>Highlighted offers</h2>
      <div className="carouselContainer">
        <Carousel cols={5} rows={1} gap={2} loop>
          {products.map((product) => (
            <Carousel.Item key={product.id}>
              <FlipCard key={product.id} product={product} />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

export default HighlightedOffers;
