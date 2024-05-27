// import { useEffect, useState } from "react";
// import { Category } from "./models/category";

function App() {
  //   const [categories, setCategories] = useState<Array<Category>>([]);
  //   const [productCards, setProductCards] = useState<JSX.Element[]>([]);

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  //   async function fetchData() {
  //     const results = await (
  //       await fetch("http://localhost:3000/categories")
  //     ).json();
  //     setCategories(results);
  //   }

  //   async function fetchCategory(id: string) {
  //     const result = await (
  //       await fetch(`http://localhost:3000/categories/${id}`)
  //     ).json();

  //     console.log(result);
  //   }

  //   async function fetchProductsByCategory(id: string) {
  //     try {
  //       const results = await (
  //         await fetch(`http://localhost:3000/products/productsByCategory/${id}`)
  //       ).json();

  //       if (Array.isArray(results)) {
  //         console.log(results);
  //         const productCards = results.map((product) => (
  //           <div key={product.id} className="product-card">
  //             <img
  //               src={product.imageUrl}
  //               alt={product.name}
  //               className="product-image"
  //             />
  //             <div className="product-details">
  //               <h3 className="product-name">{product.name}</h3>
  //               <p className="product-price">${product.price}</p>
  //             </div>
  //           </div>
  //         ));

  //         setProductCards(productCards);
  //       } else {
  //         console.log("No se encontraron productos para esta categoría");
  //       }
  //     } catch (error) {
  //       console.error("Error al obtener los productos:", error);
  //     }
  //   }

  return (
    <>
      {/* <div className="categories-container">
        {categories.map((category) => (
          <div
            className="category-item"
            key={category.id}
            onClick={() => fetchProductsByCategory(category.id)}
          >
            {category.categoryNameEs}
          </div>
        ))}
      </div>
      <div className="product-cards-container">{productCards}</div> */}
    </>
  );
}

export default App;
