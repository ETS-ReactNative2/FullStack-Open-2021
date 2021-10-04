const BlogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../utils/configs");

const getTokenForm = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    return authorization.substring(7);
  }
  return null;
};

BlogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

BlogRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const blog = await Blog.findById(id).populate("user");
  if (blog) response.json(blog);
  else response.status(404).end();
});

BlogRouter.post("/", async (request, response) => {
  const token = getTokenForm(request);
  const decodedToken = jwt.verify(token, config.SECRET);
  if (!token || !decodedToken)
    return response.status(401).json({ error: "token is missing or invalid" });

  const { title, url, author, likes } = request.body;
  if (!url) return response.status(400).json({ error: "URL is missing" });

  if (!title) return response.status(400).json({ error: "Title is missing" });

  const user = await User.findById(decodedToken.id);
  const blog = new Blog({
    url,
    title,
    author: author || null,
    likes: likes || 0,
    user: user._id,
  });

  const addedBlog = await blog.save();
  const blogs = user.blogs.concat(addedBlog._id);
  console.log(blogs);
  await User.findByIdAndUpdate(decodedToken.id, { blogs });
  response.status(201).json(addedBlog);
});

BlogRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  await Blog.findByIdAndRemove(id);
  response.status(204).end();
});

BlogRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const newBlog = {
    likes: request.body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(id, newBlog, { new: true });
  response.json(updatedBlog);
});

module.exports = BlogRouter;
