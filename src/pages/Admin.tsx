import React, { useEffect, useState } from "react";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    category_id: 0,
    image_url: "",
    offer: false,
    discount: 0,
    barcelonaStock: false,
    murciaStock: false,
    valenciaStock: false,
    sevillaStock: false,
    bilbaoStock: false,
    cordobaStock: false,
    aCorunaStock: false,
    segoviaStock: false,
    final_price: 0,
    feature_values: {}, // Objeto para almacenar los valores de características
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [featureValues, setFeatureValues] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchFeatureValues = async (categoryId) => {
    try {
      const response = await fetch(`/api/values/category/${categoryId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setFeatureValues(data);
    } catch (error) {
      console.error(
        `Error fetching feature values for category ${categoryId}:`,
        error
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Calcular final_price
      const finalPrice = newProduct.price * (1 - newProduct.discount / 100);

      // Crear el objeto completo del producto
      const productData = {
        ...newProduct,
        final_price: finalPrice,
      };

      // Agregar el producto mediante una solicitud POST
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Limpiar el formulario y actualizar la lista de productos
      setNewProduct({
        name: "",
        price: 0,
        category_id: 0,
        image_url: "",
        offer: false,
        discount: 0,
        barcelonaStock: false,
        murciaStock: false,
        valenciaStock: false,
        sevillaStock: false,
        bilbaoStock: false,
        cordobaStock: false,
        aCorunaStock: false,
        segoviaStock: false,
        final_price: 0,
        feature_values: {}, // Limpiar los valores de características después de agregar el producto
      });
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Función para manejar el cambio de categoría seleccionada
  const handleCategoryChange = (event) => {
    const categoryId = parseInt(event.target.value);
    setSelectedCategoryId(categoryId);
    fetchFeatureValues(categoryId);
    // Limpiar los valores de características al cambiar la categoría
    setNewProduct({
      ...newProduct,
      category_id: categoryId,
      feature_values: {},
    });
  };

  // Función para manejar el cambio de valor de características
  const handleFeatureValueChange = (featureId, value) => {
    setNewProduct({
      ...newProduct,
      feature_values: {
        ...newProduct.feature_values,
        [featureId]: value,
      },
    });
  };

  return (
    <>
      <h1>Product Administration</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <br />
        <label>Price:</label>
        <input
          type="number"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })
          }
        />
        <br />
        <label>Category:</label>
        <select value={newProduct.category_id} onChange={handleCategoryChange}>
          <option value={0}>Select Category</option>
          {categories.map((category) => {
            // Limitar las opciones según la categoría seleccionada
            if (category.id >= 1 && category.id <= 6) {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              );
            }
            return null;
          })}
        </select>
        <br />
        <label>Image URL:</label>
        <input
          type="text"
          value={newProduct.image_url}
          onChange={(e) =>
            setNewProduct({ ...newProduct, image_url: e.target.value })
          }
        />
        <br />
        <label>Offer:</label>
        <input
          type="checkbox"
          checked={newProduct.offer}
          onChange={(e) =>
            setNewProduct({ ...newProduct, offer: e.target.checked })
          }
        />
        <br />
        <label>Discount (%):</label>
        <input
          type="number"
          value={newProduct.discount}
          onChange={(e) =>
            setNewProduct({ ...newProduct, discount: parseInt(e.target.value) })
          }
        />
        <br />
        <label>Barcelona Stock:</label>
        <input
          type="checkbox"
          checked={newProduct.barcelonaStock}
          onChange={(e) =>
            setNewProduct({ ...newProduct, barcelonaStock: e.target.checked })
          }
        />
        <br />

        <label>Murcia Stock:</label>
        <input
          type="checkbox"
          checked={newProduct.barcelonaStock}
          onChange={(e) =>
            setNewProduct({ ...newProduct, murciaStock: e.target.checked })
          }
        />
        <br />

        <label>Valencia Stock:</label>
        <input
          type="checkbox"
          checked={newProduct.barcelonaStock}
          onChange={(e) =>
            setNewProduct({ ...newProduct, valenciaStock: e.target.checked })
          }
        />
        <br />

        <label>Sevilla Stock:</label>
        <input
          type="checkbox"
          checked={newProduct.barcelonaStock}
          onChange={(e) =>
            setNewProduct({ ...newProduct, sevillaStock: e.target.checked })
          }
        />
        <br />

        <label>Bilbao Stock:</label>
        <input
          type="checkbox"
          checked={newProduct.barcelonaStock}
          onChange={(e) =>
            setNewProduct({ ...newProduct, bilbaoStock: e.target.checked })
          }
        />
        <br />

        <label>Cordoba Stock:</label>
        <input
          type="checkbox"
          checked={newProduct.barcelonaStock}
          onChange={(e) =>
            setNewProduct({ ...newProduct, cordobaStock: e.target.checked })
          }
        />
        <br />

        <label>A Coruna Stock:</label>
        <input
          type="checkbox"
          checked={newProduct.barcelonaStock}
          onChange={(e) =>
            setNewProduct({ ...newProduct, aCorunaStock: e.target.checked })
          }
        />
        <br />

        <label>Segovia Stock:</label>
        <input
          type="checkbox"
          checked={newProduct.barcelonaStock}
          onChange={(e) =>
            setNewProduct({ ...newProduct, segoviaStock: e.target.checked })
          }
        />
        <br />
        <label>Feature Values:</label>
        <ul>
          {featureValues.map((value) => (
            <li key={value.id}>
              {value.feature_name_es}:{" "}
              <input
                type="text"
                value={newProduct.feature_values[value.id] || ""}
                onChange={(e) =>
                  handleFeatureValueChange(value.id, e.target.value)
                }
              />
            </li>
          ))}
        </ul>
        <br />
        <button type="submit">Add Product</button>
      </form>
    </>
  );
};

export default Admin;
