import React, { useEffect, useState } from "react";

const FetchProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error(err));
  }, []);

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

export default FetchProducts;
