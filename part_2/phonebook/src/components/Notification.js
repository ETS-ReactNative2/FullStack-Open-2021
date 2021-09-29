import React from "react";

const Notification = ({ success, message }) => {
  const popupStyle = {
    color: success ? "green" : "red",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  if (message) {
    return <div style={popupStyle}>{message}</div>;
  }
  return null;
};

export default Notification;
