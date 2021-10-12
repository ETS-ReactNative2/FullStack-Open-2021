import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (content) => {
  const newAnecdote = { content, votes: 0 };
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
};

const get = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const vote = async (id) => {
  const anecdoteToVote = await get(id);
  anecdoteToVote.votes++;
  const response = await axios.put(`${baseUrl}/${id}`, anecdoteToVote);
  return response.data;
};

export default { getAll, create, vote };
