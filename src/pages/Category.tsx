import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../models/product";
import FlipCard from "../components/FlipCard";
import Loading from "../components/Loading";
import Navbar2 from "../components/NavBar2";
import Footer from "../components/Footer";
import "../styles/category.css";

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [buttonBackExpanded, setButtonBackExpanded] = useState<boolean>(false);
  const [backFilterColor, setBackFilterColor] = useState<string>("rgba(253, 174, 55, 0.2)");

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

        // Fetch category for each product sequentially
        const productsWithCategory = await Promise.all(
          data.map(async (product) => {
            const category = await fetchCategory(product.categoryId);
            return { ...product, category };
          })
        );

        setProducts(productsWithCategory);
      } catch (error) {
        setError(
          "Error al obtener los productos. Inténtelo de nuevo más tarde."
        );
      } finally {
        setLoading(false);
      }
    };

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
      fetchProductsByCategory();
      fetchCategoryName();
    }
  }, [categoryId]);

  const fetchCategory = async (categoryId: number): Promise<Category> => {
    const response = await fetch(
      `http://localhost:3000/categories/${categoryId}`
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data: Category = await response.json();
    return data;
  };

  const handleFilterButtonClick = () => {
    setButtonBackExpanded((prev) => !prev);
    setBackFilterColor(prevColor => prevColor === "rgba(253, 174, 55, 0.2)" ? "orange" : "rgba(253, 174, 55, 0.2)");
  };

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div id="filter">
        <div className="backFilterContainer">
          <div className={`buttonBack ${buttonBackExpanded ? 'expanded' : ''}`} style={{ backgroundColor: backFilterColor }}></div>
        </div>
        <button className={`buttonFilter ${buttonBackExpanded ? 'expanded' : ''}`} onClick={handleFilterButtonClick}></button>
        {buttonBackExpanded && <div className="blueDiv"></div>}
      </div>
      <Navbar2 />
      <RepeatedTitle text="GRAPHIC CARDS" />
      <div className="filterOrder">
        <button>Lowest price</button>
        <button>Highest price</button>
        <button>Best rated</button>
        <button>Offers</button>
        <button>Name</button>
      </div>
      <div className="categoryProducts">
        {products.map((product) => (
          <FlipCard key={product.id} product={product} />
        ))}
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
