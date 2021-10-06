import axios from "axios";
import Blog from "../components/Blog";
const baseUrl = "/api/blogs";

let token;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newBlog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const request = axios.post(baseUrl, newBlog, config);
  return request.then((response) => response.data);
};

const update = (blogToUpdate) => {
  const request = axios.put(`${baseUrl}/${blogToUpdate.id}`, {
    likes: blogToUpdate.likes + 1,
  });
  return request.then((response) => response.data);
};

export default { getAll, create, update, setToken };
