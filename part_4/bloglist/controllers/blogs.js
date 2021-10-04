const BlogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

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
  const { title, url, author, likes, userId } = request.body;
  if (!url) return response.status(400).json({ error: "URL is missing" });

  if (!title) return response.status(400).json({ error: "Title is missing" });

  const user = await User.findById(userId);
  const blog = new Blog({
    url,
    title,
    author: author || null,
    likes: likes || 0,
    user: user._id,
  });

  const addedBlog = await blog.save();
  user.blogs = user.blogs.concat(addedBlog._id);
  await user.save();
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
    likes: {}.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(id, newBlog, { new: true });
  response.json(updatedBlog);
});

module.exports = BlogRouter;
