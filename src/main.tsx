// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

import Loading from "./components/Loading";
import Cart from "./pages/Cart";
import Category from "./pages/Category";
import Comparator from "./pages/Comparator";
import Home from "./pages/Home";
import Likes from "./pages/Likes";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Profile from "./pages/Profile";
import ProjectInfo from "./pages/ProjectInfo";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";

const userId = "user-id-from-context-or-auth";

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
  {
    path: "/comparator",
    element: <Comparator />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/likes",
    element: <Likes />,
  },
  {
    path: "/admin",
    element: <ProtectedRoute element={<Admin />} userId={userId} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
