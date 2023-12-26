const RoundedButton = ({ onClick, children }: any) => {
  const buttonStyle = {
    borderRadius: "10px",
    padding: "10px 20px",
    backgroundColor: "#4285f4",
    color: "white",
    cursor: "pointer",
    outline: "none",
    border: "none",
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      {children}
    </button>
  );
};

export default RoundedButton;
