import { FaPlus, FaMagnifyingGlass } from "react-icons/fa6";
import "../styles/comparator-content.css";
import React, { useState, useEffect } from 'react';

const ComparatorContent = () => {
  const [categories, setCategories] = useState<{ id: number, name: string }[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('categories').select('*');
      if (error) {
        console.error('Error fetching categories:', error);
      } else {
        setCategories(data);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <div className="comparator-content-container">
        <div className="comparator-selected-container">
          <div className="comparator-item-selected-container">
            <FaPlus className="comparator-plus-icon" />
          </div>
          <div className="comparator-vs-container">
            <p>asdadsa</p>
          </div>
          <div className="comparator-item-selected-container">
            <FaPlus className="comparator-plus-icon" />
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
            <option value="">Componente</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <select name="" id="">
            <option value="">Marca</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default ComparatorContent;
