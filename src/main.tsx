import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";

import Loading from "./components/Loading";
import Category from "./pages/Category";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProjectInfo from "./pages/ProjectInfo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/productsByCategory/:categoryId",
    element: <Category />,
  },
  {
    path: "/projectInfo",
    element: <ProjectInfo />,
  },
  {
    path: "/product/:productId",
    element: <Product />,
  },
  {
    path: "/loading/",
    element: <Loading />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
