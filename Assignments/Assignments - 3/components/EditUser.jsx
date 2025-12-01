import React, { useEffect, useState } from "react";

const EditUser = () => {
  const [user, setUser] = useState({ firstName: "", lastName: "", age: "" });

  useEffect(() => {
    fetch("https://dummyjson.com/users/1")
      .then((res) => res.json())
      .then((data) => setUser({ firstName: data.firstName, lastName: data.lastName, age: data.age }));
  }, []);

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    await fetch("https://dummyjson.com/users/1", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    alert("User Updated!");
  };

  return (
    <div>
      <input name="firstName" value={user.firstName} onChange={handleChange} />
      <input name="lastName" value={user.lastName} onChange={handleChange} />
      <input name="age" value={user.age} onChange={handleChange} />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default EditUser;
