import React from "react";

const Notification = ({ message, isSuccess }) => {
  const styleNoti = {
    border: "3px solid",
    borderRadius: "10px",
    borderColor: isSuccess ? "green" : "red",
    color: isSuccess ? "green" : "red",
    backgroundColor: "lightgrey",
    padding: "10px",
  };
  return <div style={styleNoti}>{message}</div>;
};

export default Notification;
