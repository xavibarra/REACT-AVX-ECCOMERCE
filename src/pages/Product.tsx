import { useEffect, useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import CardAddCartProduct from "../components/CardAddCartProduct";
import CharacteristicProductDetails from "../components/CharacteristicProductDetails";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import NavBar2 from "../components/NavBar2";
import { Category } from "../models/category";
import { FeaturesValues } from "../models/featuresValues";
import { Product } from "../models/product";
import { Review } from "../models/review";
import { User } from "../models/user";
import "../styles/productDetails.css";
import "../styles/reviewRating.css";

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [featuresValues, setFeaturesValues] = useState<FeaturesValues[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [users, setUsers] = useState<{ [key: string]: User | null }>({});
  const [reviewCounts, setReviewCounts] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });
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
        fetchCategory(data.categoryId);
        fetchFeaturesValues(productId);
        fetchReviews(productId);
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

  const fetchCategory = async (categoryId: number) => {
    try {
      const response = await fetch(`
        http://localhost:3000/categories/${categoryId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data: Category = await response.json();
      console.log(data);
      setCategory(data);
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

  const fetchReviews = async (productId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/reviews/findReviewsByProductId/${productId}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data: Review[] = await response.json();
      setReviews(data);
      countReviews(data); // Calculate the review counts
      data.forEach((review) => fetchUser(review.userId));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const fetchUser = async (userId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/getById/${userId}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data: User = await response.json();
      setUsers((prevUsers) => ({ ...prevUsers, [userId]: data }));
    } catch (error) {
      console.error(`Error fetching user with ID ${userId}:`, error);
    }
  };

  const countReviews = (reviews: Review[]) => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      const rating = Math.round(review.rating);
      counts[rating] = (counts[rating] || 0) + 1;
    });
    setReviewCounts(counts);
  };

  const handleLikeClick = async (reviewId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/reviews/updateLikes/${reviewId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ incrementBy: 1 }), // Increment likes by 1
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const updatedReview: Review = await response.json();
      // Actualizar la lista de reviews con el review actualizado
      setReviews((prevReviews) =>
        prevReviews.map((r) => (r.id === updatedReview.id ? updatedReview : r))
      );
    } catch (error) {
      console.error(`Error liking review with ID ${reviewId}:`, error);
    }
  };

  // Función para generar las estrellas según el rating
  const generateStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} />
        ))}
        {hasHalfStar && <FaStarHalfAlt />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} />
        ))}
      </>
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Calcular el precio final con o sin descuento
  const finalPrice =
    product && product.offer
      ? (product.price * (1 - product.discount / 100)).toFixed(2)
      : product?.price.toFixed(2);

  // Determinar las tiendas disponibles
  const availableStores = [
    product?.barcelonaStock && "Barcelona",
    product?.bilbaoStock && "Bilbao",
    product?.cordobaStock && "Córdoba",
    product?.madridStock && "Madrid",
    product?.aCorunaStock && "A Coruña",
    product?.murciaStock && "Murcia",
    product?.valenciaStock && "Valencia",
    product?.segoviaStock && "Segovia",
    product?.sevillaStock && "Sevilla",
    product?.sanSebastianStock && "San Sebastian",
  ].filter(Boolean);

  // Función para calcular el porcentaje de cada calificación
  const calculatePercentage = (count: number, total: number) => {
    return total > 0 ? (count / total) * 100 : 0;
  };

  // Calcular el total de opiniones
  const totalReviews = Object.values(reviewCounts).reduce((a, b) => a + b, 0);

  return (
    <section>
      <NavBar2 />
      <div className="productDetails">
        <div className="productDetailsDiv">
          <img src={product?.imageUrl} alt="" />
        </div>
        <div className="productDetailsDiv2">
          <div className="productDetailName">
            <h3>{product?.rating}</h3>
            <h3>{product?.name}</h3>
          </div>
          <div className="productDetailsStars">
            {generateStars(product?.rating || 0)}
          </div>
          <CardAddCartProduct tiendas={availableStores} price={finalPrice} />
        </div>
        <div>
          {product ? (
            <div>
              <CharacteristicProductDetails
                label={"PRICE"}
                value={`${finalPrice}€`}
              />
              <CharacteristicProductDetails
                label={"RATING"}
                value={generateStars(product?.rating || 0)}
              />
              {featuresValues.map(
                (featureValue) =>
                  featureValue.value !== null && (
                    <CharacteristicProductDetails
                      key={featureValue.id_feature}
                      label={featureValue.feature_name_es}
                      value={featureValue.value}
                    />
                  )
              )}
            </div>
          ) : (
            <p>No product found with ID {productId}</p>
          )}
        </div>
        <div className="categoryDescription">
          {category ? <p>{category.categoryDescriptionEn}</p> : <Loading />}
        </div>
      </div>
      <div className="reviews">
        <h2>Opinions</h2>
        <div className="review-rating">
          <div className="reviews-summary-container">
            <div className="rating-circle">
              <span>{product?.rating.toFixed(1)}</span>
            </div>
            <div className="reviews-summary">
              {Object.keys(reviewCounts).map((star) => (
                <div key={star} className="review-bar">
                  <span>
                    {star} <FaStar />
                  </span>
                  <div className="bar">
                    <div
                      className="filled-bar"
                      style={{
                        width: `${calculatePercentage(
                          reviewCounts[star],
                          totalReviews
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <span>{reviewCounts[star]}</span>
                </div>
              ))}
            </div>
          </div>
          <button className="add-review-btn">Add Review</button>
        </div>
      </div>
      <div className="userReviews">
        {reviews.length > 0 ? (
          reviews.map((review) => {
            const user = users[review.userId];
            return (
              <div key={review.id} className="review">
                <h4 className="reviewEmail">
                  {user ? user.email : "Loading user..."}
                </h4>
                <div className="reviewContent">
                  <div className="reviewStars">
                    {generateStars(review.rating)}
                  </div>
                  <p className="reviewText">{review.review}</p>
                  <div className="likesContainer">
                    <div className="likeNumber">{review.likes}</div>
                    <div>
                      <button
                        className="add-review-btn"
                        onClick={() => handleLikeClick(review.id.toString())}
                      >
                        Like
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No reviews yet for this product.</p>
        )}
      </div>
      <Footer />
    </section>
  );
};

export default ProductPage;
