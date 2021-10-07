import React, { useState } from "react";

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [showDetail, setShowDetail] = useState(false);
  const handleShowDetail = () => setShowDetail(!showDetail);

  return (
    <div style={blogStyle}>
      {blog.title}
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
