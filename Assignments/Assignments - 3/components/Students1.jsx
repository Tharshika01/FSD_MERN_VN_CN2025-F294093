import React from "react";

const students1 = [
  { name: "Alice", age: 20 },
  { name: "Bob", age: 22 },
];

const Students1 = () => {
  return (
    <div>
      {students1.map((s, i) => (
        <div key={i} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          {s.name} - {s.age}
        </div>
      ))}
    </div>
  );
};

export default Students1;
