import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { likeABlog, deleteBlog } from "../reducer/blogReducer";
import { Link } from "react-router-dom";

const Blog = ({ blog, user, noti }) => {
  const dispatch = useDispatch();
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [showDetail, setShowDetail] = useState(false);
  const handleShowDetail = () => setShowDetail(!showDetail);

  const likeBlog = async (blogToUpdate) => {
    try {
      await dispatch(likeABlog(blogToUpdate));
    } catch (err) {
      console.log(err);
    }
  };

  const removeBlog = async (blogToRemove) => {
    if (
      window.confirm(`Remove ${blogToRemove.title} by ${blogToRemove.author}`)
    ) {
      try {
        await dispatch(deleteBlog(blogToRemove));
        noti(`Removed blog ${blogToRemove.title} successfully.`);
      } catch (err) {
        noti("Failed to remove blog", false);
      }
    }
  };

  return (
    <div className="blog" style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      <button onClick={handleShowDetail}>{showDetail ? "hide" : "view"}</button>
      {showDetail && (
        <>
          <div>{blog.url}</div>
          <div>
            likes: {blog.likes}
            <button className="like-btn" onClick={() => likeBlog(blog)}>
              like
            </button>
          </div>
          <div>{blog.author}</div>
          {user.username === blog.user.username && (
            <button onClick={() => removeBlog(blog)}>delete</button>
          )}
        </>
      )}
    </div>
  );
};
export default Blog;
