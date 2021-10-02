const BlogRouter = require("express").Router();
const Blog = require("../models/blog");

BlogRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

BlogRouter.post("/", (request, response) => {
  if (!request.body.url || !request.body.title)
    return response.status(400).end();

  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = BlogRouter;
