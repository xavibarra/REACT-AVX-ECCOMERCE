import { FaPlus, FaMagnifyingGlass } from "react-icons/fa6";
import "../styles/comparator-content.css";
import { useState, useEffect } from 'react';

const ComparatorContent = () => {
    const [categories, setCategories] = useState<{ id: number, categoryNameEn: string }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:3000/categories/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCategories(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <>
            <div className="comparator-content-container">
                <div className="comparator-selected-container">
                    <div className="comparator-item-selected-container">
                        <a href="">
                            <FaPlus className="comparator-plus-icon" />
                        </a>
                    </div>
                    <div className="comparator-vs-container">
                        <p>asdadsa</p>
                    </div>
                    <div className="comparator-item-selected-container">
                        <a href="">
                            <FaPlus className="comparator-plus-icon" />
                        </a>
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
                        <input type="text" placeholder="Search" />
                    </div>
                    <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
                        <option value="">- - -</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.categoryNameEn}>
                                {category.categoryNameEn}
                            </option>
                        ))}
                    </select>
                    <select name="" id="">
                        <option value="">Marca</option>
                    </select>
                </div>
            </div>
        </>
    );
};

export default ComparatorContent;
