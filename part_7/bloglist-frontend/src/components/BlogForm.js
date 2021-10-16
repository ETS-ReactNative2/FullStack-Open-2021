import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewBlog } from "../reducer/blogReducer";

const BlogForm = ({ noti }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const createBlog = async (newBlog) => {
    try {
      await dispatch(createNewBlog(newBlog));
      noti(`A new blog ${newBlog.title} by ${newBlog.author}`);
      noteFormRef.current.toggleVisibility();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreateBlog = (event) => {
    event.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    createBlog(newBlog);
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
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            value={url}
            name="url"
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button id="btn-create-blog" type="submit">
          create
        </button>
      </form>
    </>
  );
};

export default BlogForm;
