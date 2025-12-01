import React, { useState } from "react";

const ProductFilter = () => {
  const products = [
    { name: "Laptop", category: "Electronics" },
    { name: "Shirt", category: "Clothes" },
    { name: "Phone", category: "Electronics" },
    { name: "Jeans", category: "Clothes" },
  ];

  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <div>
      <button onClick={() => setFilter("All")}>All</button>
      <button onClick={() => setFilter("Electronics")}>Electronics</button>
      <button onClick={() => setFilter("Clothes")}>Clothes</button>
      <ul>
        {filtered.map((p, i) => (
          <li key={i}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductFilter;
