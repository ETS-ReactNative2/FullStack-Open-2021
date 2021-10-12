import anecdoteService from "../services/anecdotes";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      return state.map((a) => (a.id === action.data.id ? action.data : a));
    case "CREATE":
      return state.concat(action.data);
    case "INIT":
      return action.anecdotes;
    default:
      return state;
  }
};

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT",
      anecdotes,
    });
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.vote(id);
    dispatch({
      type: "VOTE",
      data: votedAnecdote,
    });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content);
    dispatch({
      type: "CREATE",
      data: newAnecdote,
    });
  };
};

export default reducer;
