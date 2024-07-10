
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../models/product";
import FlipCard from "../components/FlipCard";
import Loading from "../components/Loading";
import Navbar2 from "../components/NavBar2";
import Footer from "../components/Footer";
import "../styles/category.css";
import { FaCircleArrowRight, FaCircleArrowLeft } from "react-icons/fa6";

const PAGE_SIZE = 10; // Número de productos por página

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1); // Estado para el número total de páginas
  const [buttonBackExpanded, setButtonBackExpanded] = useState<boolean>(false);
  const [backFilterColor, setBackFilterColor] = useState<string>(
    "rgba(253, 174, 55, 0.2)"
  );

  // Función para cargar productos por categoría y página
  const fetchProductsByCategory = async (page: number) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `http://localhost:3000/products/productsByCategory/${categoryId}?page=${page}`
      );

      if (!response.ok) {
        throw new Error("Error al obtener los productos.");
      }
      const data: Product[] = await response.json();

      // Calcular el número total de páginas
      const totalCount = response.headers.get("X-Total-Count");
      if (totalCount) {
        const total = Math.ceil(Number(totalCount) / PAGE_SIZE);
        setTotalPages(total);
      }

      // Actualizar estado con los nuevos productos cargados
      setProducts(data);
      setCurrentPage(page); // Actualizar la página actual
    } catch (error) {
      setError("Error al obtener los productos. Inténtelo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
      } catch (error) {
        setError(
          "Error al obtener el nombre de la categoría. Inténtelo de nuevo más tarde."
        );
      }
    };

    if (categoryId) {
      fetchProductsByCategory(1); // Cargar la primera página inicialmente
      fetchCategoryName();
    }
  }, [categoryId]);

  const handleFilterButtonClick = () => {
    setButtonBackExpanded((prev) => !prev);
    setBackFilterColor((prevColor) =>
      prevColor === "rgba(253, 174, 55, 0.2)"
        ? "orange"
        : "rgba(253, 174, 55, 0.2)"
    );
  };

  const handleLoadMore = () => {
    fetchProductsByCategory(currentPage + 1); // Cargar la siguiente página
  };

  const handleLoadPrevious = () => {
    if (currentPage > 1) {
      fetchProductsByCategory(currentPage - 1); // Cargar la página anterior
    }
  };

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div id="filter">
        <div className="backFilterContainer">
          <div
            className={`buttonBack ${buttonBackExpanded ? "expanded" : ""}`}
            style={{ backgroundColor: backFilterColor }}></div>
        </div>
        <button
          className={`buttonFilter ${buttonBackExpanded ? "expanded" : ""}`}
          onClick={handleFilterButtonClick}></button>
        {buttonBackExpanded && <div className="blueDiv"></div>}
      </div>
      <Navbar2 />
      <div className="titleContainer">
        {/* Mostrar solo los títulos de la primera página */}
        {products.slice(0, PAGE_SIZE).map((product) => (
          <RepeatedTitle
            key={product.id}
            text={product.categories.category_name_en}
          />
        ))}
      </div>

      <div className="filterOrder">
        <button>Lowest price</button>
        <button>Highest price</button>
        <button>Best rated</button>
        <button>Offers</button>
        <button>Name</button>
      </div>
      <div className="categoryProducts">
        {/* Mostrar productos de la página actual */}
        {products.map((product) => (
          <FlipCard key={product.id} product={product} />
        ))}
      </div>
      {/* Información de paginación */}
      <div className="pagination">
        <p>
          Página {currentPage} de {totalPages}
        </p>
        {currentPage > 1 && (
          <button onClick={handleLoadPrevious}>
            <FaCircleArrowLeft />
          </button>
        )}
        {products.length >= PAGE_SIZE && (
          <button onClick={handleLoadMore}>
            <FaCircleArrowRight />
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
};

const RepeatedTitle = ({ text }: { text: string }) => {
  const repeatedText = new Array(10).fill(text).join(" ");

  return (
    <div className="title">
      <p>{repeatedText}</p>
    </div>
  );
};

export default Category;
