const reducer = (state = "", action) => {
  switch (action.type) {
    case "SET_NOTI":
      return action.message;
    case "CLEAR_NOTI":
      return "";
    default:
      return state;
  }
};

export const updateNotification = (message, delayTime) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTI",
      message,
    });

    setTimeout(() => dispatch({ type: "CLEAR_NOTI" }), delayTime * 1000);
  };
};

export default reducer;
