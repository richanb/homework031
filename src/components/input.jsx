import React from "react";

const Input = ({ get }) => {
  return (
    <input
      onChange={(e) => get(e.target.value)}
      type="text"
      className="form-control"
      placeholder="type your name track"
      aria-label="type your name track"
      aria-describedby="basic-addon2"
    />
  );
};

export default Input;
