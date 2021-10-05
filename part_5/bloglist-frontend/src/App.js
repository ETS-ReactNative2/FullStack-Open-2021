import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(true);

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
    setMessage(message);
    setIsSuccess(isSuccess);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
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

  const loginForm = () => {
    return (
      <>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username:
            <input
              type="text"
              name="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            password:
            <input
              type="text"
              name="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </>
    );
  };

  const blogList = () => {
    return (
      <>
        <h2>blogs</h2>
        <div>
          {`${user.username} logged in`}
          <button onClick={handleLogout}>logout</button>
        </div>
        <BlogForm blogs={blogs} setBlogs={setBlogs} noti={noti} />
        <div>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      </>
    );
  };

  return (
    <div>
      {message && <Notification message={message} isSuccess={isSuccess} />}
      {user === null ? loginForm() : blogList()}
    </div>
  );
};

export default App;
