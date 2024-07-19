import { useEffect, useState } from "react";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import FlipCard from "../components/FlipCard";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import Navbar2 from "../components/NavBar2";
import "../styles/category.css";
import { supabaseClient } from "../utils/supabaseClient";

const PAGE_SIZE = 20; // Número de productos por página

const Likes = () => {
  const [userLikes, setUserLikes] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<string>("");
  const [activeSortOrder, setActiveSortOrder] = useState<string>(""); // Estado para rastrear el botón activo

  // Función para cargar productos por likes y página
  const fetchUserLikes = async (page: number, sort: string = "") => {
    try {
      setLoading(true);
      setError(null);

      // Obtener datos del usuario
      const { data: userData, error: userError } =
        await supabaseClient.auth.getUser();
      if (userError) {
        throw new Error(userError.message);
      }

      const userId = userData.user.id; // Obtener el userId del usuario

      // Obtener los likes del usuario desde Supabase
      const { data: profileData, error: profileError } = await supabaseClient
        .from("profiles")
        .select("likes")
        .eq("id", userId)
        .single();

      if (profileError) {
        throw new Error(profileError.message);
      }

      const likesItems = profileData.likes || [];

      // Obtener los productos basados en los IDs de los likes
      const promises = likesItems.map(async (productId) => {
        const response = await fetch(
          `http://localhost:3000/products/${productId}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch product with ID ${productId}`);
        }
        const productData = await response.json();
        return productData;
      });

      const productsData = await Promise.all(promises);

      // Calcular el número total de páginas
      const total = Math.ceil(productsData.length / PAGE_SIZE);
      setTotalPages(total);

      // Actualizar estado con los nuevos productos cargados
      setUserLikes(
        productsData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
      );
      setCurrentPage(page); // Actualizar la página actual
    } catch (error: unknown) {
      const err = error as Error;
      setError("Error al obtener los productos. Inténtelo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserLikes(1, sortOrder); // Cargar la primera página inicialmente con el orden seleccionado
  }, [sortOrder]);

  const handleLoadMore = () => {
    fetchUserLikes(currentPage + 1, sortOrder); // Cargar la siguiente página con el orden seleccionado
  };

  const handleLoadPrevious = () => {
    if (currentPage > 1) {
      fetchUserLikes(currentPage - 1, sortOrder); // Cargar la página anterior
    }
  };

  const handleSortOrderChange = (order: string) => {
    setSortOrder(order);
    setActiveSortOrder(order); // Establecer el botón activo
    fetchUserLikes(1, order); // Cargar la primera página con el nuevo orden
  };

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Navbar2 />
      <div className="titleContainer">
        {/* Mostrar solo los títulos de la primera página */}
        {userLikes.slice(0, PAGE_SIZE).map((product) => (
          <RepeatedTitle key={product.id} text={"FAVORITES"} />
        ))}
      </div>

      <div className="filterOrder">
        <button
          onClick={() => handleSortOrderChange("lowestPrice")}
          className={activeSortOrder === "lowestPrice" ? "active" : ""}>
          Lowest price
        </button>
        <button
          onClick={() => handleSortOrderChange("highestPrice")}
          className={activeSortOrder === "highestPrice" ? "active" : ""}>
          Highest price
        </button>
        <button
          onClick={() => handleSortOrderChange("bestRated")}
          className={activeSortOrder === "bestRated" ? "active" : ""}>
          Best rated
        </button>
        <button
          onClick={() => handleSortOrderChange("offers")}
          className={activeSortOrder === "offers" ? "active" : ""}>
          Offers
        </button>
        <button
          onClick={() => handleSortOrderChange("name")}
          className={activeSortOrder === "name" ? "active" : ""}>
          Name
        </button>
      </div>
      <div className="categoryProducts">
        {/* Mostrar productos de la página actual */}
        {userLikes.map((product) => (
          <FlipCard key={product.id} product={product} />
        ))}
      </div>
      {/* Información de paginación */}
      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={handleLoadPrevious}>
            <FaCircleArrowLeft />
          </button>
        )}
        <p>{currentPage}</p>

        {userLikes.length >= PAGE_SIZE && (
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
  const repeatedText = new Array(10).fill(text).join("\u00A0\u00A0\u00A0");

  return (
    <div className="title">
      <p>{repeatedText}</p>
    </div>
  );
};

export default Likes;
