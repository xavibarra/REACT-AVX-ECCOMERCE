import i18next from "i18next";
import React from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

import Loading from "./components/Loading";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Category from "./pages/Category";
import Comparator from "./pages/Comparator";
import Home from "./pages/Home";
import Likes from "./pages/Likes";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Profile from "./pages/Profile";
import ProjectInfo from "./pages/ProjectInfo";

import global_ca from "./translations/ca/global.json";
import global_en from "./translations/en/global.json";
import global_es from "./translations/es/global.json";

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
    path: "likes",
    element: <Likes />,
  },
  {
    path: "admin",
    element: <Admin />,
  },
]);

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      global: global_en,
    },
    es: {
      global: global_es,
    },
    ca: {
      global: global_ca,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <RouterProvider router={router} />
    </I18nextProvider>
  </React.StrictMode>
);
