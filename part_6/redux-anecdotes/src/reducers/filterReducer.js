const reducer = (state = "", action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.filter;
    default:
      return state;
  }
};

export const updateFilter = (filter) => {
  return {
    type: "SET_FILTER",
    filter,
  };
};

export default reducer;
