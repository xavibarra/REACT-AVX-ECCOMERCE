import { useEffect, useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import CardAddCartProduct from "../components/CardAddCartProduct";
import CharacteristicProductDetails from "../components/CharacteristicProductDetails";
import NavBar2 from "../components/NavBar2";
import type { Category } from "../models/category";
import type { FeaturesValues } from "../models/featuresValues";
import type { Product } from "../models/product";
import "../styles/productDetails.css";

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>(); // Obtener `productId` de la URL
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
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
        fetchCategory(data.categoryId);
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

  const fetchCategory = async (categoryId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/categories/${categoryId}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data: Category = await response.json();
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

  return (
    <section>
      <NavBar2></NavBar2>
      <div className="productDetails">
        <div className="productDetailsDiv">
          <img src={product.imageUrl} alt="" />
        </div>
        <div className="productDetailsDiv">
          <div className="productDetailName">
            <h3>{product.rating}</h3>
            <h3>{product.name}</h3>
          </div>
          <div className="productDetailsStars">
            {generateStars(product.rating)}
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
        <div>
          <p>{category ? category.categoryDescriptionEs : "Loading..."}</p>
        </div>
      </div>
    </section>
  );
};
export default ProductPage;
