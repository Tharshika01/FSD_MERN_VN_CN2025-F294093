import React from "react";

const LocalDataCards = () => {
  const data = [
    { id: 1, name: "Laptop", price: 999 },
    { id: 2, name: "Phone", price: 499 },
    { id: 3, name: "Tablet", price: 299 }
  ];

  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      {data.map((item) => (
        <div
          key={item.id}
          style={{ border: "1px solid #ccc", padding: "10px", width: "150px" }}
        >
          <h4>{item.name}</h4>
          <p>${item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default LocalDataCards;
