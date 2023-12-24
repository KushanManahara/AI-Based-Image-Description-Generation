import React from "react";

const RoundedButton = ({ onClick, children }: any) => {
  const buttonStyle = {
    borderRadius: "10px", // Adjust the border-radius as needed
    padding: "10px 20px", // Adjust padding as needed
    backgroundColor: "#4285f4", // Button background color
    color: "white", // Button text color
    cursor: "pointer",
    outline: "none", // Remove default outline
    border: "none", // Remove default border
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
};

export default RoundedButton;
