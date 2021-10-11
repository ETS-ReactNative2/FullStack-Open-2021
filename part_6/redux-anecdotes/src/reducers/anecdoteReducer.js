const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const id = action.data.id;
      const anecdoteToVote = state.find((a) => a.id === id);
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };
      return state.map((a) => (a.id === action.data.id ? votedAnecdote : a));
    case "CREATE":
      return state.concat(action.data);
    case "INIT":
      return action.anecdotes;
    default:
      return state;
  }
};

export const initAnecdotes = (anecdotes) => {
  return {
    type: "INIT",
    anecdotes,
  };
};

export const voteAnecdote = (id) => {
  return {
    type: "VOTE",
    data: { id },
  };
};

export const createAnecdote = (newAnecdotes) => {
  return {
    type: "CREATE",
    data: newAnecdotes,
  };
};

export default reducer;
