import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import FlipCard from "../components/FlipCard";
import Footer from "../components/Footer";
import LanguageSwitcher from "../components/LanguageSwitcher";
import Loading from "../components/Loading";
import Navbar2 from "../components/NavBar2";
import { Product } from "../models/product";
import "../styles/category.css";

const PAGE_SIZE = 10; // Número de productos por página

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [buttonBackExpanded, setButtonBackExpanded] = useState<boolean>(false);
  const [backFilterColor, setBackFilterColor] = useState<string>(
    "rgba(253, 174, 55, 0.2)"
  );
  const [sortOrder, setSortOrder] = useState<string>("");
  const [activeSortOrder, setActiveSortOrder] = useState<string>(""); // Estado para rastrear el botón activo
  const [minPrice, setMinPrice] = useState<number>(1); // Valor mínimo del rango de precio
  const [maxPrice, setMaxPrice] = useState<number>(5000); // Valor máximo del rango de precio
  const [brands, setBrands] = useState<Set<string>>(new Set());
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());

  // Estados temporales para los filtros
  const [tempMinPrice, setTempMinPrice] = useState<number>(1);
  const [tempMaxPrice, setTempMaxPrice] = useState<number>(5000);
  const [tempSelectedBrands, setTempSelectedBrands] = useState<Set<string>>(
    new Set()
  );
  const { t } = useTranslation("global");

  // Función para transformar los nombres de categorías en claves para la traducción
  const translateCategory = (categoryName: string) => {
    // Normaliza el nombre de categoría a minúsculas y reemplaza espacios con guiones bajos
    const normalizedCategory = categoryName.toLowerCase().replace(/\s+/g, "_");

    // Traduce usando i18next y devuelve el nombre original si la traducción no está disponible
    console.log(normalizedCategory);
    const translatedCategory = t(`categories.${normalizedCategory}`);
    console.log(translatedCategory);
    return t(`categories2.${normalizedCategory}`, categoryName);
  };

  // Función para cargar productos por categoría y página
  const fetchProductsByCategory = async (page: number, sort: string = "") => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `http://localhost:3000/products/productsByCategory/${categoryId}?page=${page}&sort=${sort}&minPrice=${minPrice}&maxPrice=${maxPrice}`
      );

      if (!response.ok) {
        throw new Error("Error al obtener los productos.");
      }
      const data: Product[] = await response.json();

      // Extraer marcas de los productos
      const extractedBrands = new Set(
        data.map((product) => product.name.split(" ")[0])
      );
      setBrands(extractedBrands);

      // Calcular el número total de páginas
      const totalCount = response.headers.get("X-Total-Count");
      if (totalCount) {
        const total = Math.ceil(Number(totalCount) / PAGE_SIZE);
        setTotalPages(total);
      }

      // Filtrar productos por marcas seleccionadas si hay alguna seleccionada
      const filteredData = selectedBrands.size
        ? data.filter((product) =>
            selectedBrands.has(product.name.split(" ")[0])
          )
        : data;

      // Actualizar estado con los nuevos productos cargados
      setProducts(filteredData);
      setCurrentPage(page); // Actualizar la página actual
    } catch (error: unknown) {
      const err = error as Error;
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
        setCategoryName(data.categoryNameEn);
      } catch (error) {
        const err = error as Error;
        setError(
          "Error al obtener el nombre de la categoría. Inténtelo de nuevo más tarde."
        );
      }
    };

    if (categoryId) {
      fetchProductsByCategory(1, sortOrder); // Cargar la primera página inicialmente con el orden seleccionado
      fetchCategoryName();
    }
  }, [categoryId, sortOrder, minPrice, maxPrice, selectedBrands]);

  const handleFilterButtonClick = () => {
    setButtonBackExpanded((prev) => !prev);
    setBackFilterColor((prevColor) =>
      prevColor === "rgba(253, 174, 55, 0.2)"
        ? "orange"
        : "rgba(253, 174, 55, 0.2)"
    );
  };

  const handleLoadMore = () => {
    fetchProductsByCategory(currentPage + 1, sortOrder); // Cargar la siguiente página con el orden seleccionado
  };

  const handleLoadPrevious = () => {
    if (currentPage > 1) {
      fetchProductsByCategory(currentPage - 1, sortOrder); // Cargar la página anterior
    }
  };

  const handleSortOrderChange = (order: string) => {
    setSortOrder(order);
    setActiveSortOrder(order); // Establecer el botón activo
    fetchProductsByCategory(1, order); // Cargar la primera página con el nuevo orden
  };

  const handleMinPriceChange = (event) => {
    const price = parseInt(event.target.value);
    setTempMinPrice(price);
    if (price >= tempMaxPrice) {
      setTempMaxPrice(price + 1);
    }
  };

  const handleMaxPriceChange = (event) => {
    const price = parseInt(event.target.value);
    if (price > tempMinPrice) {
      setTempMaxPrice(price);
    } else {
      setTempMaxPrice(tempMinPrice + 1);
    }
  };

  const handleBrandChange = (brand) => {
    setTempSelectedBrands((prevSelectedBrands) => {
      const newSelectedBrands = new Set(prevSelectedBrands);
      if (newSelectedBrands.has(brand)) {
        newSelectedBrands.delete(brand);
      } else {
        newSelectedBrands.add(brand);
      }
      return newSelectedBrands;
    });
  };

  const applyFilters = () => {
    setMinPrice(tempMinPrice);
    setMaxPrice(tempMaxPrice);
    setSelectedBrands(tempSelectedBrands);
    setCurrentPage(1); // Resetear a la primera página cuando se aplican filtros
    setButtonBackExpanded(false); // Ocultar el filtro al aplicar cambios
    setBackFilterColor("rgba(253, 174, 55, 0.2)"); // Restaurar el color de fondo original de buttonBack
  };

  const closeFilter = () => {
    setButtonBackExpanded(false); // Función para cerrar el filtro al hacer clic en backgroundFilter
    setBackFilterColor("rgba(253, 174, 55, 0.2)"); // Restaurar el color de fondo original de buttonBack
  };

  const formatPrice = (price) => {
    return `€${price}`;
  };

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div id="filter">
        <div className="backFilterContainer">
          <div
            className={`buttonBack ${buttonBackExpanded ? "expanded" : ""}`}
            style={{ backgroundColor: backFilterColor }}
          >
            {buttonBackExpanded && (
              <div className="filterContainer">
                <div className="priceFilter">
                  <div className="namePrice">
                    <h3> {t("category.filter_price_range")}</h3>
                    <p>
                      {formatPrice(tempMinPrice)} - {formatPrice(tempMaxPrice)}
                    </p>{" "}
                  </div>
                  {/* Muestra el rango de precio seleccionado */}
                  <div className="priceInputs">
                    <input
                      type="range"
                      min="1"
                      max="5000"
                      value={tempMinPrice}
                      onChange={handleMinPriceChange}
                    />
                    <input
                      type="range"
                      min="1"
                      max="5000"
                      value={tempMaxPrice}
                      onChange={handleMaxPriceChange}
                    />
                  </div>
                </div>
                <div className="brandFilter">
                  <h3> {t("category.brands")}</h3>
                  <div className="brandCheckboxes">
                    {[...brands].map((brand) => (
                      <div key={brand}>
                        <input
                          type="checkbox"
                          id={brand}
                          checked={tempSelectedBrands.has(brand)}
                          onChange={() => handleBrandChange(brand)}
                        />
                        <label htmlFor={brand}>{brand}</label>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="buttonApply" onClick={applyFilters}>
                  {t("category.button")}
                </button>
              </div>
            )}
          </div>
          {buttonBackExpanded && (
            <div className="backgroundFilter" onClick={closeFilter}></div>
          )}
        </div>
        <button
          className={`buttonFilter ${buttonBackExpanded ? "expanded" : ""}`}
          onClick={handleFilterButtonClick}
        ></button>
        {buttonBackExpanded && <div className="blueDiv"></div>}
      </div>
      <Navbar2 />
      <div className="titleContainer">
        {/* Mostrar el título de la categoría */}
        <RepeatedTitle text={translateCategory(categoryName)} />
      </div>

      <div className="filterOrder">
        <button
          onClick={() => handleSortOrderChange("lowestPrice")}
          className={activeSortOrder === "lowestPrice" ? "active" : ""}
        >
          {t("category.order_lowest")}
        </button>
        <button
          onClick={() => handleSortOrderChange("highestPrice")}
          className={activeSortOrder === "highestPrice" ? "active" : ""}
        >
          {t("category.order_highest")}
        </button>
        <button
          onClick={() => handleSortOrderChange("bestRated")}
          className={activeSortOrder === "bestRated" ? "active" : ""}
        >
          {t("category.order_rated")}
        </button>
        <button
          onClick={() => handleSortOrderChange("offers")}
          className={activeSortOrder === "offers" ? "active" : ""}
        >
          {t("category.order_offers")}
        </button>
        <button
          onClick={() => handleSortOrderChange("name")}
          className={activeSortOrder === "name" ? "active" : ""}
        >
          {t("category.order_name")}
        </button>
      </div>
      <div
        className={`categoryProducts ${
          products.length === 0 ? "noProducts" : ""
        }`}
      >
        {/* Mostrar productos de la página actual */}
        {products.length > 0 ? (
          products.map((product) => (
            <FlipCard key={product.id} product={product} />
          ))
        ) : (
          <p>{t("category.error")}</p>
        )}
      </div>
      {/* Información de paginación */}
      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={handleLoadPrevious}>
            <FaCircleArrowLeft />
          </button>
        )}
        <p>{currentPage}</p>

        {products.length >= PAGE_SIZE && (
          <button onClick={handleLoadMore}>
            <FaCircleArrowRight />
          </button>
        )}
      </div>
      <LanguageSwitcher />
      <Footer />
    </div>
  );
};

const RepeatedTitle = ({ text }: { text: string }) => {
  const repeatedText = new Array(20).fill(text).join("\u00A0\u00A0\u00A0");

  return (
    <div className="title">
      <p>{repeatedText}</p>
    </div>
  );
};

export default Category;
