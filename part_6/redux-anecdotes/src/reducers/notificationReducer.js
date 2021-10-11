const reducer = (state = "", action) => {
  switch (action.type) {
    case "SET_NOTI":
      return action.message;
    default:
      return state;
  }
};

export const updateNotification = (message) => {
  return {
    type: "SET_NOTI",
    message,
  };
};

export default reducer;
