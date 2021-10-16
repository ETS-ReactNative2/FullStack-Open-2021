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

const App = () => {
  const dispath = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const notification = useSelector((state) => state.notification);

  const noteFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserInfo = window.localStorage.getItem("loggedUserInfo");
    const parsedUserInfo = JSON.parse(loggedUserInfo);
    if (loggedUserInfo) {
      setUser(parsedUserInfo);
      blogService.setToken(parsedUserInfo.token);
    }
  }, []);

  const noti = (message, isSuccess = true) => {
    dispath(updateNotification(message, isSuccess));
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

  const createBlog = (newBlog) => {
    blogService
      .create(newBlog)
      .then((savedBlog) => {
        savedBlog.user = user;
        setBlogs(blogs.concat(savedBlog));
        noti(`A new blog ${savedBlog.title} by ${savedBlog.author}`);
        noteFormRef.current.toggleVisibility();
      })
      .catch((error) => {
        noti(error.response.data.error || "Failed to add new blog", false);
      });
  };

  const likeBlog = (blogToUpdate) => {
    blogService
      .update(blogToUpdate)
      .then((updatedBlog) =>
        setBlogs(
          blogs.map((blog) =>
            blog.id === blogToUpdate.id ? updatedBlog : blog
          )
        )
      );
  };

  const removeBlog = (blogToRemove) => {
    if (
      window.confirm(`Remove ${blogToRemove.title} by ${blogToRemove.author}`)
    ) {
      blogService
        .remove(blogToRemove.id)
        .then(() => {
          noti(`Removed blog ${blogToRemove.title} successfully.`);
          setBlogs(blogs.filter((blog) => blog.id !== blogToRemove.id));
        })
        .catch(() => noti("Failed to remove blog", false));
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
          {blogs
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
