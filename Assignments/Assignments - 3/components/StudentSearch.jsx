import React, { useState } from "react";

const StudentSearch = () => {
  const students = ["Alice", "Bob", "Charlie", "David", "Eve"];
  const [query, setQuery] = useState("");

  const filtered = students.filter((s) => s.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <input
        type="text"
        placeholder="Search students"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {filtered.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </div>
  );
};

export default StudentSearch;
