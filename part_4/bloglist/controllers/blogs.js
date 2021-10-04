const BlogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../utils/configs");

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
  const decodedToken = jwt.verify(request.token, config.SECRET);
  if (!decodedToken.id)
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
  const decodedToken = jwt.verify(request.token, config.SECRET);
  const id = request.params.id;
  const blogToDelete = await Blog.findById(id);
  if (
    !decodedToken.id ||
    decodedToken.id.toString() !== blogToDelete.user.toString()
  )
    return response.status(401).json({ error: "permission denied" });
  const user = await User.findById(decodedToken.id);
  await Blog.findByIdAndRemove(id);
  const blogs = user.blogs.filter((blog) => blog.toString() !== id);
  await User.findByIdAndUpdate(decodedToken.id, { blogs });
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
