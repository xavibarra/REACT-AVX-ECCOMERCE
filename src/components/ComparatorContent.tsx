import { FaPlus, FaMagnifyingGlass } from "react-icons/fa6";
import "../styles/comparator-content.css";
import { useState, useEffect } from 'react';
import ComparatorFlipCard from "./ComparatorFlipCard";
import { Product } from "../models/product";
import grafica4090 from "../assets/img/grafica-4090.jpg";
import graficaAmd from "../assets/img/grafica-amd.jpg";
import { IoClose } from "react-icons/io5";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

interface FeaturesValues {
  id_feature: number;
  feature_name_es: string;
  value: string;
}

const ComparatorContent = () => {
  const [categories, setCategories] = useState<{ id: number, categoryNameEn: string }[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [comparisonProducts, setComparisonProducts] = useState<(Product | null)[]>([null, null]);
  const [featuresValues1, setFeaturesValues1] = useState<FeaturesValues[]>([]);
  const [featuresValues2, setFeaturesValues2] = useState<FeaturesValues[]>([]);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [comparisonError, setComparisonError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(5000);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/categories/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
        let url = '';

        if (search && selectedCategory) {
            url = `http://localhost:3000/products/searchByAllFilters/${minPrice}/${maxPrice}/${search}/${selectedCategory}`;
        } else if (search) {
            url = `http://localhost:3000/products/searchByPriceAndName/${minPrice}/${maxPrice}/${search}`;
        } else if (selectedCategory) {
            url = `http://localhost:3000/products/searchByPriceAndCategory/${minPrice}/${maxPrice}/${selectedCategory}`;
        } else {
            url = `http://localhost:3000/products/searchByPrice/${minPrice}/${maxPrice}`;
        }

        console.log("Fetch URL:", url); // Para depuración

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};






  const fetchFeaturesValues = async (productId: number, setFeatures: (features: FeaturesValues[]) => void) => {
    try {
      const response = await fetch(`http://localhost:3000/values/features/${productId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data: FeaturesValues[] = await response.json();
      setFeatures(data);
    } catch (error) {
      console.error('Error fetching features values:', error);
    }
  };

  const handleSearchClick = () => {
    fetchProducts();
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchProducts();
    }
  };

  const handleAddToComparator = (product: Product) => {
    const newComparisonProducts = [...comparisonProducts];
    const firstEmptyIndex = newComparisonProducts.findIndex(p => p === null);

    if (firstEmptyIndex !== -1) {
      if (firstEmptyIndex === 1 && newComparisonProducts[0]?.categoryId !== product.categoryId) {
        setComparisonError("No se pueden comparar dos objetos de diferentes categorías");
        setTimeout(() => setComparisonError(null), 2000);
        return;
      }
      newComparisonProducts[firstEmptyIndex] = product;
      setComparisonProducts(newComparisonProducts);
      fetchFeaturesValues(product.id, firstEmptyIndex === 0 ? setFeaturesValues1 : setFeaturesValues2);
      setShowAddedMessage(true);
      setTimeout(() => setShowAddedMessage(false), 2000);
      if (firstEmptyIndex === 1) {
        window.scrollTo(0, 0);
      }
    } else {
      document.querySelector(".comparator-selected-container")?.scrollIntoView({ behavior: "smooth" });
      document.querySelectorAll(".comparator-remove-choice-icon").forEach(icon => {
        icon.classList.add("highlight");
        setTimeout(() => {
          icon.classList.remove("highlight");
        }, 2000);
      });
    }
  };

  const handleRemoveFromComparator = (index: number) => {
    const newComparisonProducts = [...comparisonProducts];
    newComparisonProducts[index] = null;
    setComparisonProducts(newComparisonProducts);
    if (index === 0) setFeaturesValues1([]);
    else setFeaturesValues2([]);
  };

  const generateStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="stars">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} />
        ))}
        {hasHalfStar && <FaStarHalfAlt />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} />
        ))}
      </div>
    );
  };

  const commonFeatures = [
    { label: "PRICE", key: "price" },
    { label: "RATING", key: "rating", customRender: generateStars },
  ];

  const allFeatures = [...new Set([
    ...featuresValues1.map(f => f.feature_name_es),
    ...featuresValues2.map(f => f.feature_name_es)
  ])];

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };


  const handleSeeProduct = (productId: number | null) => {
    if (productId) {
      window.open(`/product/${productId}`, '_blank');
    }
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMinPrice = Number(event.target.value);
    setMinPrice(newMinPrice);
    if (newMinPrice > maxPrice) {
      setMaxPrice(newMinPrice);
    }
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxPrice = Number(event.target.value);
    setMaxPrice(newMaxPrice);
    if (newMaxPrice < minPrice) {
      setMinPrice(newMaxPrice);
    }
  };

  const handleMinPriceInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMinPrice = Number(event.target.value);
    setMinPrice(newMinPrice);
  };

  const handleMaxPriceInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxPrice = Number(event.target.value);
    setMaxPrice(newMaxPrice);
  };


  return (
    <>
      <div className="comparator-content-container">
        {showAddedMessage && <div className="added-message">Product added to comparator</div>}
        {comparisonError && <div className="comparison-error">{comparisonError}</div>}
        <div className="comparator-selected-container">
          <div className="comparator-item-selected-container">
            <div className={comparisonProducts[0] ? "comparator-first-choice-container" : "comparator-first-choice-container-hidden"}>
              <div className={comparisonProducts[0] ? "comparator-rating-name-container" : "comparator-rating-name-container-hidden"}>
                <h4 className="comparator-rating">{comparisonProducts[0] ? comparisonProducts[0].rating : 'Rating'}</h4>
                <h4 className="comparator-name">{comparisonProducts[0] ? comparisonProducts[0].name : 'Nombre'}</h4>
                <IoClose className="comparator-remove-choice-icon" onClick={() => handleRemoveFromComparator(0)} />
              </div>
              <img className="comparator-first-choice-img" src={comparisonProducts[0] ? comparisonProducts[0].imageUrl : grafica4090} alt="" />
              <div className="comparator-see-product-button-container">
                <div className="comparator-see-product-button-container">
                  <button onClick={() => handleSeeProduct(comparisonProducts[0]?.id)}>
                    <h6>See Product</h6>
                  </button>
                </div>
              </div>
            </div>
            <a href="#comparator-add-title-container" className={comparisonProducts[0] ? "comparator-plus-icon-1-container-hidden" : "comparator-plus-icon-1-container"}>
              <FaPlus className="comparator-plus-icon" />
            </a>
          </div>

          <div className="comparator-vs-container">
            <div className="comparator-vs-line"></div>
            <div className="comparator-vs-icon"><p>VS</p></div>
            <div className="comparator-vs-line"></div>
          </div>
          <div className="comparator-item-selected-container">
            <div className={comparisonProducts[1] ? "comparator-second-choice-container" : "comparator-second-choice-container-hidden"}>
              <div className={comparisonProducts[1] ? "comparator-rating-name-container" : "comparator-rating-name-container-hidden"}>
                <h4 className="comparator-rating">{comparisonProducts[1] ? comparisonProducts[1].rating : 'Rating'}</h4>
                <h4 className="comparator-name">{comparisonProducts[1] ? comparisonProducts[1].name : 'Nombre'}</h4>
                <IoClose className="comparator-remove-choice-icon" onClick={() => handleRemoveFromComparator(1)} />
              </div>
              <img className="comparator-second-choice-img" src={comparisonProducts[1] ? comparisonProducts[1].imageUrl : graficaAmd} alt="" />
              <div className="comparator-see-product-button-container">
                <div className="comparator-see-product-button-container">
                  <button onClick={() => handleSeeProduct(comparisonProducts[1]?.id)}>
                    <h6>See Product</h6>
                  </button>
                </div>
              </div>
            </div>
            <a href="#comparator-add-title-container" className={comparisonProducts[1] ? "comparator-plus-icon-2-container-hidden" : "comparator-plus-icon-2-container"}>
              <FaPlus className="comparator-plus-icon" />
            </a>
          </div>
        </div>
        <div className={comparisonProducts.every(product => product === null) ? "comparator-choices-names-container-hidden" : "comparator-choices-names-container"}>
          <h4>{comparisonProducts[0]?.name || '(Item1)'} VS {comparisonProducts[1]?.name || '(---)'}</h4>
        </div>
        <div className={comparisonProducts.every(product => product === null) ? "comparator-characteristics-container-hidden" : "comparator-characteristics-container"}>
          {commonFeatures.map((feature) => (
            <div key={feature.label} className="comparator-characteristics-row">
              <div className="comparator-characteristics-cell">{feature.label}</div>
              <div className="comparator-characteristics-cell">{comparisonProducts[0] ? (feature.customRender ? feature.customRender(comparisonProducts[0][feature.key]) : comparisonProducts[0][feature.key] ?? "- - - -") : "- - - -"}</div>
              <div className="comparator-characteristics-cell">{comparisonProducts[1] ? (feature.customRender ? feature.customRender(comparisonProducts[1][feature.key]) : comparisonProducts[1][feature.key] ?? "- - - -") : "- - - -"}</div>
            </div>
          ))}
          {allFeatures.map((feature) => {
            const feature1 = featuresValues1.find(f => f.feature_name_es === feature);
            const feature2 = featuresValues2.find(f => f.feature_name_es === feature);
            return (
              <div key={feature} className="comparator-characteristics-row">
                <div className="comparator-characteristics-cell">{feature}</div>
                <div className="comparator-characteristics-cell">{feature1 ? feature1.value ?? "- - - -" : "- - - -"}</div>
                <div className="comparator-characteristics-cell">{feature2 ? feature2.value ?? "- - - -" : "- - - -"}</div>
              </div>
            );
          })}
        </div>
        <div id="comparator-add-title-container" className="comparator-add-title-container">
          <h3>Añade un componente</h3>
        </div>
        <div className="comparator-search-container">
          <div className="comparator-input-container">
            <div className="comparator-input-icon-container">
              <FaMagnifyingGlass className="comparator-input-icon" />
            </div>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={handleSearchKeyPress}
            />
          </div>
          <div className="comparator-choice-categories-container">
            <select onChange={handleCategoryChange} value={selectedCategory}>
              <option value="">-- Select Category --</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id.toString()}>
                  {category.categoryNameEn}
                </option>
              ))}
            </select>
          </div>
          <div className="comparator-price-filter">
            <div className="comparator-price-filter-header">
              <h3>Price</h3>
            </div>
            <div className="comparator-priceInputs">
              <input
                type="range"
                min="0"
                max="5000"
                value={minPrice}
                onChange={handleMinPriceChange}
              />
              <input
                type="range"
                min="0"
                max="5000"
                value={maxPrice}
                onChange={handleMaxPriceChange}
              />
            </div>
            <div className="comparator-price-values">
              <input
                type="number"
                value={minPrice}
                onChange={handleMinPriceInputChange}
                min="0"
                max="5000"
              />
              <span>€</span>
              <span> - </span>
              <input
                type="number"
                value={maxPrice}
                onChange={handleMaxPriceInputChange}
                min="0"
                max="5000"
              />
              <span>€</span>
            </div>
          </div>
        </div>
        <div className="comparator-button-search-container">
          <button className="comparator-button-search" onClick={handleSearchClick}>
            <h6>Search</h6>
          </button>
        </div>
        <div className="comparator-grid">
          {products.map((product) => (
            <ComparatorFlipCard key={product.id} product={product} onAddToComparator={handleAddToComparator} />
          ))}
        </div>
      </div >
    </>
  );
};

export default ComparatorContent;
