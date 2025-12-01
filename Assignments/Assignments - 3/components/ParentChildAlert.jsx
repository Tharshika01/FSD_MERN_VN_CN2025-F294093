import React from "react";

const Child = ({ showAlert }) => {
  return <button onClick={showAlert}>Click Me</button>;
};

const ParentChildAlert = () => {
  const showAlert = () => alert("Alert from Parent!");

  return <Child showAlert={showAlert} />;
};

export default ParentChildAlert;
