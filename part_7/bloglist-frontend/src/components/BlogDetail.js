import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import blogService from "../services/blogs";
import { likeABlog } from "../reducer/blogReducer";

const BlogDetail = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const [blog, setBlog] = useState(null);
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
    </>
  );
};

export default BlogDetail;
