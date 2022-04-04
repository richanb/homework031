import React from "react";

const Button = ({ select, name, color = "primary", data }) => {
  return (
    <button
      onClick={() => {
        select(data);
      }}
      type="button"
      className={`btn btn-${color} mt-3`}
    >
      {name}
    </button>
  );
};

export default Button;
