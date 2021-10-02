const BlogRouter = require("express").Router();
const { response } = require("express");
const Blog = require("../models/blog");

BlogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

BlogRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const blog = await Blog.findById(id);
  if (blog) response.json(blog);
  else response.status(404).end();
});

BlogRouter.post("/", async (request, response) => {
  if (!request.body.url)
    return response.status(400).json({ error: "URL is missing" });

  if (!request.body.title)
    return response.status(400).json({ error: "Title is missing" });

  const blog = new Blog(request.body);

  const addedBlog = await blog.save();
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
