import React, { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ blogs, setBlogs, noti }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreateBlog = (event) => {
    event.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };

    blogService
      .create(newBlog)
      .then((savedBlog) => {
        setBlogs(blogs.concat(savedBlog));
        noti(`A new blog ${savedBlog.title} by ${savedBlog.author}`);
      })
      .catch((error) => {
        noti(error?.response?.data?.error || "Failed to add new blog", false);
      });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <>
      <h2>Create a new blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="url"
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default BlogForm;
