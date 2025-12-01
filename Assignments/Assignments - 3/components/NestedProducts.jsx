import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Electronics = () => <h3>Electronics Products</h3>;
const Fashion = () => <h3>Fashion Products</h3>;

const ProductsPage = () => {
  return (
    <div>
      <h2>Products</h2>
      <nav>
        <Link to="electronics">Electronics</Link> | <Link to="fashion">Fashion</Link>
      </nav>
      <Routes>
        <Route path="electronics" element={<Electronics />} />
        <Route path="fashion" element={<Fashion />} />
      </Routes>
    </div>
  );
};

const NestedProducts = () => (
  <Router>
    <Routes>
      <Route path="/products/*" element={<ProductsPage />} />
    </Routes>
  </Router>
);

export default NestedProducts;
