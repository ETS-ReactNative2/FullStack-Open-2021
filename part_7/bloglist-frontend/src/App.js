import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { updateNotification } from "./reducer/notificationReducer";
import {
  initBlogs,
  createNewBlog,
  deleteBlog,
  likeABlog,
} from "./reducer/blogReducer";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const notification = useSelector((state) => state.notification);

  const noteFormRef = useRef();

  useEffect(() => dispatch(initBlogs()), [dispatch]);

  useEffect(() => {
    const loggedUserInfo = window.localStorage.getItem("loggedUserInfo");
    const parsedUserInfo = JSON.parse(loggedUserInfo);
    if (loggedUserInfo) {
      setUser(parsedUserInfo);
      blogService.setToken(parsedUserInfo.token);
    }
  }, []);

  const noti = (message, isSuccess = true) => {
    dispatch(updateNotification(message, isSuccess));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      0;
      const res = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedUserInfo", JSON.stringify(res));
      blogService.setToken(res.token);
      setUser(res);
      setUsername("");
      setPassword("");
    } catch (exception) {
      noti("Wrong username or password", false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedUserInfo");
    blogService.setToken(undefined);
    noti("Logged out successfully!");
  };

  const createBlog = async (newBlog) => {
    try {
      await dispatch(createNewBlog(newBlog));
      noti(`A new blog ${newBlog.title} by ${newBlog.author}`);
      noteFormRef.current.toggleVisibility();
    } catch (err) {
      console.log(err);
    }
  };

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

  const blogList = () => {
    return (
      <>
        <h2>blogs</h2>
        <div>
          {`${user.username} logged in`}
          <button onClick={handleLogout}>logout</button>
        </div>
        <Togglable ref={noteFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
        <div>
          {blogs &&
            blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  likeBlog={likeBlog}
                  removeBlog={removeBlog}
                  user={user}
                />
              ))}
        </div>
      </>
    );
  };

  return (
    <div>
      {notification.message && (
        <Notification
          message={notification.message}
          isSuccess={notification.isSuccess}
        />
      )}
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      ) : (
        blogList()
      )}
    </div>
  );
};

export default App;
