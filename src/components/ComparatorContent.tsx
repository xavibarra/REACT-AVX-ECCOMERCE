import { FaPlus, FaMagnifyingGlass } from "react-icons/fa6";
import "../styles/comparator-content.css";
import { useState, useEffect } from 'react';
import ComparatorFlipCard from "./ComparatorFlipCard";
import { Product } from "../models/product"; // Asegúrate de que la ruta es correcta
import grafica4090 from "../assets/img/grafica-4090.jpg"
import graficaAmd from "../assets/img/grafica-amd.jpg"
import { IoClose } from "react-icons/io5";



const ComparatorContent = () => {
    const [categories, setCategories] = useState<{ id: number, categoryNameEn: string }[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState('');
    const [comparisonProducts, setComparisonProducts] = useState<(Product | null)[]>([null, null]);


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
            console.log(`Searching for products with name: ${search}`);
            const url = `http://localhost:3000/products/search/${search}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProducts(data);
            console.log('Products received from backend:', data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            fetchProducts();
        }
    };

    return (
        <>
            <div className="comparator-content-container">
                <div className="comparator-selected-container">
                    <div className="comparator-item-selected-container">
                        <div className="comparator-first-choice-container">
                            <div className="comparator-rating-name-container">
                                <h4 className="comparator-rating">Rating</h4>
                                <h4 className="comparator-name">Nombre</h4>
                                <IoClose className="comparator-remove-choice-icon"/>
                            </div>
                            <img className="comparator-first-choice-img" src={grafica4090} alt="" />
                            <button>
                                <p>See Product</p>
                            </button>
                        </div>
                        <a href="" className="comparator-plus-icon-1-container-hidden">
                            <FaPlus className="comparator-plus-icon" />
                        </a>
                    </div>
                    
                    <div className="comparator-vs-container">
                        <div className="comparator-vs-line"></div>
                        <div className="comparator-vs-icon"><p>VS</p></div>
                        <div className="comparator-vs-line"></div>
                    </div>
                    <div className="comparator-item-selected-container">
                    <div className="comparator-second-choice-container">
                            <div className="comparator-rating-name-container">
                                <h4 className="comparator-rating">Rating</h4>
                                <h4 className="comparator-name">Nombre</h4>
                                <IoClose className="comparator-remove-choice-icon"/>
                            </div>
                            <img className="comparator-second-choice-img" src={graficaAmd} alt="" />
                            <button>
                                <p>See Product</p>
                            </button>
                        </div>
                        <a href="" className="comparator-plus-icon-2-container-hidden">
                            <FaPlus className="comparator-plus-icon" />
                        </a>
                    </div>
                </div>
                <div className="comparator-choices-names-container">
                            <h4>(Item1) VS (Item2)</h4>
                </div>
                <div className="comparator-characteristics-container">
                    <div>

                    </div>
                    <div>

                    </div>
                    <div>

                    </div>

                </div>
                <div className="comparator-add-title-container">
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
                    <select>
                        <option value="">- - -</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id.toString()}>
                                {category.categoryNameEn}
                            </option>
                        ))}
                    </select>
                    <select name="" id="">
                        <option value="">Marca</option>
                    </select>
                </div>
                <div className="comparator-grid">
                    {products.map((product) => (
                        <ComparatorFlipCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default ComparatorContent;
