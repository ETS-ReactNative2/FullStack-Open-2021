import React from "react";

const styles = {
  color: "red",
  border: "1px solid red",
  margin: "10px",
  padding: "10px",
  borderRadius: "10px",
};

const Notify = ({ message }) => {
  if (message) return <p style={styles}>{message}</p>;
  return null;
};

export default Notify;
