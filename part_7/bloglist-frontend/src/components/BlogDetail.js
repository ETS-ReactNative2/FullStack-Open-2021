import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import blogService from "../services/blogs";
import { likeABlog, commentBlog } from "../reducer/blogReducer";

const BlogDetail = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    blogService.get(id).then((returnedBlog) => setBlog(returnedBlog));
  }, []);

  const likeBlog = async (blogToUpdate) => {
    try {
      await dispatch(likeABlog(blogToUpdate));
      const likedBlog = {
        ...blog,
      };
      likedBlog.likes++;
      setBlog(likedBlog);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeComment = (event) => {
    setComment(event.target.value);
  };

  const handleAddComment = (event) => {
    event.preventDefault();
    dispatch(commentBlog(blog, comment));
    const updatedBlog = { ...blog };
    updatedBlog.comments = updatedBlog.comments
      ? updatedBlog.comments.concat(comment)
      : [comment];
    setBlog(updatedBlog);
    setComment("");
  };

  if (!blog) return null;

  return (
    <>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        likes {blog.likes}
        <button onClick={() => likeBlog(blog)}>like</button>
      </div>
      <div>added by {blog.author}</div>
      <h3>comments</h3>
      <form onSubmit={handleAddComment}>
        <input value={comment} onChange={handleChangeComment} />
        <button type="submit">Comment</button>
      </form>
      <ul>
        {blog.comments &&
          blog.comments.map((comment) => (
            <li key={`${blog.id}-${Math.trunc(Math.random() * 1000000)}`}>
              {comment}
            </li>
          ))}
      </ul>
    </>
  );
};

export default BlogDetail;
