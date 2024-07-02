import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Category from "./pages/Category.tsx";
import FlipCard from "./components/FlipCard.tsx";
const App: React.FC = () => {
  return (
    <>
      <FlipCard />
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route
            path="/productsByCategory/:categoryId"
            element={<Category />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
