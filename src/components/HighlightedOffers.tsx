/* import { useEffect, useState } from "react";
import Carousel from "react-grid-carousel";
import { Product } from "../models/product";

import "../styles/HighlightedOffers.css";
import FlipCard from "./FlipCard";
import Loading from "./Loading";

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
    console.log(products[0]);
  }, []);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

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
 */
import { useEffect, useState } from "react";
import { Product } from "../models/product";
import "../styles/HighlightedOffers.css";
import FlipCard from "./FlipCard";
import Loading from "./Loading";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { useTranslation } from "react-i18next";

function HighlightedOffers() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const { t } = useTranslation("global");

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
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOfferProducts();
  }, []);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  if (error) return <p>Error: {error}</p>;

  if (products.length === 0) {
    return (
      <section className="highlighted-offers-container">
        <h2>Highlighted offers</h2>
        <div className="carouselContainer">
          <p>No hay productos disponibles</p>
        </div>
      </section>
    );
  }

  return (
    <section className="highlighted-offers-container">
      <h2>{t("home.offers")}</h2>
      <div className="carouselContainer">
        <button onClick={prevSlide} className="carouselButton prevButton">
          <IoIosArrowDropleftCircle />
        </button>
        <div className="carouselInner">
          <div
            className="carouselPage"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}>
            {products.map((product, index) => (
              <div className="carouselItem" key={product.id}>
                <FlipCard product={product} />
              </div>
            ))}
          </div>
        </div>
        <button onClick={nextSlide} className="carouselButton nextButton">
          <IoIosArrowDroprightCircle />
        </button>
      </div>
    </section>
  );
}

export default HighlightedOffers;
