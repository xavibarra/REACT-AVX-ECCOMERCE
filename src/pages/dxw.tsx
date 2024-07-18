import React, { useEffect, useState } from "react";
import "../styles/admin.css"; // Importamos el archivo CSS para los estilos

interface Product {
  id: number;
  name: string;
  price: number;
  category_id: number;
  image_url: string;
  offer: boolean;
  discount: number;
  barcelonaStock: boolean;
  murciaStock: boolean;
  valenciaStock: boolean;
  sevillaStock: boolean;
  bilbaoStock: boolean;
  cordobaStock: boolean;
  aCorunaStock: boolean;
  segoviaStock: boolean;
  final_price: number;
  feature_values: { [key: number]: string };
}

interface Category {
  id: number;
  categoryNameEn: string;
}

interface Feature {
  id: number;
  name: string;
}

const Admin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
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
    feature_values: {},
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [featureValues, setFeatureValues] = useState<Feature[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [productsFiltered, setProductsFiltered] = useState<Product[]>([]);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false); // Estado para controlar la visibilidad del formulario

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (selectedCategoryId) {
      setProductsFiltered(
        filteredProducts.filter(
          (product) => product.category_id === selectedCategoryId
        )
      );
    } else {
      setProductsFiltered(filteredProducts);
    }
  }, [products, searchTerm, selectedCategoryId]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/products");
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
      const response = await fetch("http://localhost:3000/categories");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleEditProduct = (productId: number) => {
    console.log("Editing product with id:", productId);
    setEditProductId(productId);
  };

  const handleUpdateProduct = async (
    productId: number,
    newData: Partial<Product>
  ) => {
    try {
      const response = await fetch(
        `http://localhost:3000/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setEditProductId(null); // Reset edit mode
      fetchProducts(); // Refresh product list after update
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof Product
  ) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setNewProduct({
      ...newProduct,
      [field]: value,
    });
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      fetchProducts(); // Refresh product list after delete
    } catch (error) {
      console.error(`Error deleting product with id ${productId}:`, error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
      const response = await fetch("http://localhost:3000/products", {
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
        id: 0,
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
        feature_values: {},
      });
      fetchProducts();
      setShowAddForm(false); // Ocultar el formulario después de agregar el producto
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleCategoryChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const categoryId = parseInt(event.target.value);
    setSelectedCategoryId(categoryId);
    fetchFeatureValues(categoryId);
    setNewProduct({
      ...newProduct,
      category_id: categoryId,
      feature_values: {},
    });
  };

  const handleFeatureValueChange = (featureId: number, value: string) => {
    setNewProduct({
      ...newProduct,
      feature_values: {
        ...newProduct.feature_values,
        [featureId]: value,
      },
    });
  };

  const fetchFeatureValues = async (categoryId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3000/values/${categoryId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setFeatureValues(data);
    } catch (error) {
      console.error("Error fetching feature values:", error);
    }
  };

  return (
    <div className="admin-container">
      {!showAddForm && (
        <div className="add-product-button pagination2">
          <button onClick={() => setShowAddForm(true)}>Add Product</button>
        </div>
      )}

      {showAddForm && (
        <div className="add-product-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => handleInputChange(e, "name")}
                required
              />
            </div>
            <div className="form-group">
              <label>Price:</label>
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) => handleInputChange(e, "price")}
                required
              />
            </div>
            <div className="form-group">
              <label>Category:</label>
              <select
                value={newProduct.category_id}
                onChange={handleCategoryChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.categoryNameEn}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Image URL:</label>
              <input
                type="text"
                value={newProduct.image_url}
                onChange={(e) => handleInputChange(e, "image_url")}
                required
              />
            </div>
            <div className="form-group">
              <label>Offer:</label>
              <input
                type="checkbox"
                checked={newProduct.offer}
                onChange={(e) => handleInputChange(e, "offer")}
              />
            </div>
            <div className="form-group">
              <label>Discount:</label>
              <input
                type="number"
                value={newProduct.discount}
                onChange={(e) => handleInputChange(e, "discount")}
                required
              />
            </div>
            <div className="form-group">
              <label>Barcelona Stock:</label>
              <input
                type="checkbox"
                checked={newProduct.barcelonaStock}
                onChange={(e) => handleInputChange(e, "barcelonaStock")}
              />
            </div>
            <div className="form-group">
              <label>Murcia Stock:</label>
              <input
                type="checkbox"
                checked={newProduct.murciaStock}
                onChange={(e) => handleInputChange(e, "murciaStock")}
              />
            </div>
            <div className="form-group">
              <label>Valencia Stock:</label>
              <input
                type="checkbox"
                checked={newProduct.valenciaStock}
                onChange={(e) => handleInputChange(e, "valenciaStock")}
              />
            </div>
            <div className="form-group">
              <label>Sevilla Stock:</label>
              <input
                type="checkbox"
                checked={newProduct.sevillaStock}
                onChange={(e) => handleInputChange(e, "sevillaStock")}
              />
            </div>
            <div className="form-group">
              <label>Bilbao Stock:</label>
              <input
                type="checkbox"
                checked={newProduct.bilbaoStock}
                onChange={(e) => handleInputChange(e, "bilbaoStock")}
              />
            </div>
            <div className="form-group">
              <label>Cordoba Stock:</label>
              <input
                type="checkbox"
                checked={newProduct.cordobaStock}
                onChange={(e) => handleInputChange(e, "cordobaStock")}
              />
            </div>
            <div className="form-group">
              <label>A Coruna Stock:</label>
              <input
                type="checkbox"
                checked={newProduct.aCorunaStock}
                onChange={(e) => handleInputChange(e, "aCorunaStock")}
              />
            </div>
            <div className="form-group">
              <label>Segovia Stock:</label>
              <input
                type="checkbox"
                checked={newProduct.segoviaStock}
                onChange={(e) => handleInputChange(e, "segoviaStock")}
              />
            </div>
            <div className="form-group">
              <label>Feature Values:</label>
              {featureValues.map((feature) => (
                <div key={feature.id}>
                  <label>{feature.name}:</label>
                  <input
                    type="text"
                    value={newProduct.feature_values[feature.id] || ""}
                    onChange={(e) =>
                      handleFeatureValueChange(feature.id, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
            <button type="submit">Add Product</button>
            <button type="button" onClick={() => setShowAddForm(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
      <h2>Products List</h2>
      <div className="product-filter pagination2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
        />
      </div>

      <div className="product-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Image</th>
              <th>Offer</th>
              <th>Discount</th>
              <th>Barcelona Stock</th>
              <th>Murcia Stock</th>
              <th>Valencia Stock</th>
              <th>Sevilla Stock</th>
              <th>Bilbao Stock</th>
              <th>Cordoba Stock</th>
              <th>A Coruna Stock</th>
              <th>Segovia Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {productsFiltered
              .slice(
                (currentPage - 1) * productsPerPage,
                currentPage * productsPerPage
              )
              .map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price}€</td>
                  <td>
                    {categories.find((c) => c.id === product.category_id)
                      ?.categoryNameEn || "Unknown"}
                  </td>
                  <td>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="product-image"
                    />
                  </td>
                  <td>{product.offer ? "Yes" : "No"}</td>
                  <td>{product.discount}%</td>
                  <td>{product.barcelonaStock ? "Yes" : "No"}</td>
                  <td>{product.murciaStock ? "Yes" : "No"}</td>
                  <td>{product.valenciaStock ? "Yes" : "No"}</td>
                  <td>{product.sevillaStock ? "Yes" : "No"}</td>
                  <td>{product.bilbaoStock ? "Yes" : "No"}</td>
                  <td>{product.cordobaStock ? "Yes" : "No"}</td>
                  <td>{product.aCorunaStock ? "Yes" : "No"}</td>
                  <td>{product.segoviaStock ? "Yes" : "No"}</td>
                  <td>
                    <button onClick={() => handleEditProduct(product.id)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteProduct(product.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="pagination2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(productsFiltered.length / productsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Admin;
