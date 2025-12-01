import React, { useState } from "react";

const AddFruit = () => {
  const [fruits, setFruits] = useState(["Apple", "Banana"]);
  const [newFruit, setNewFruit] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (newFruit.trim()) {
      setFruits([...fruits, newFruit.trim()]);
      setNewFruit("");
    }
  };

  return (
    <div>
      <h2>Fruit List</h2>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Add fruit"
          value={newFruit}
          onChange={(e) => setNewFruit(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {fruits.map((fruit, i) => (
          <li key={i}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
};

export default AddFruit;
