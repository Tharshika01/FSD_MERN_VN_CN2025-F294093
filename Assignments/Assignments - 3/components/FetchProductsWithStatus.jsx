import React, { useEffect, useState } from "react";

const FetchProductsWithStatus = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div>
      <h2>Products List</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.title} - ${p.price} ({p.brand})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchProductsWithStatus;
