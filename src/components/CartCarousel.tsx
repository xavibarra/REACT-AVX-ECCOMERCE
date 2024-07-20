import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { Product } from "../models/product";
import "../styles/HighlightedOffers.css";
import FlipCard from "./FlipCard";

interface CartCarouselProps {
  productIds: string[];
}

function CartCarousel({ productIds }: CartCarouselProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const { t } = useTranslation("global");

  useEffect(() => {
    const fetchProductById = async (id: string): Promise<Product> => {
      const response = await fetch(`http://localhost:3000/products/${id}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const product: Product = await response.json();
      return product;
    };

    const fetchProducts = async () => {
      try {
        const productsData = await Promise.all(
          productIds.map((id) => fetchProductById(id))
        );
        setProducts(productsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [productIds]);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (products.length === 0) {
    return (
      <section className="highlighted-offers-container">
        <h2>{t("profile.cart")}</h2>
        <div className="carouselContainer">
          <p className="no_favorites">{t("profile.no_cart")}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="highlighted-offers-container">
      <h2>{t("profile.cart")}</h2>
      <div className="carouselContainer">
        <button onClick={prevSlide} className="carouselButton prevButton">
          <IoIosArrowDropleftCircle />
        </button>
        <div className="carouselInner">
          <div
            className="carouselPage"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {products.map((product) => (
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

export default CartCarousel;
