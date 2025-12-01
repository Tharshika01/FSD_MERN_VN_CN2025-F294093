import React from "react";

const Conditional = ({ isLoggedIn }) => {
  return <h2>{isLoggedIn ? "Welcome back!" : "Please log in"}</h2>;
};

export default Conditional;
