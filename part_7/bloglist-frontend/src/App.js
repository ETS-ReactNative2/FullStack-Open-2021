import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Users from "./components/Users";
import User from "./components/User";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { updateNotification } from "./reducer/notificationReducer";
import { initBlogs } from "./reducer/blogReducer";
import { userLogin, userLogout } from "./reducer/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const noteFormRef = useRef();

  useEffect(() => dispatch(initBlogs()), [dispatch]);

  useEffect(() => {
    const loggedUserInfo = window.localStorage.getItem("loggedUserInfo");
    if (loggedUserInfo && loggedUserInfo.token) {
      const parsedUserInfo = JSON.parse(loggedUserInfo);
      console.log("parsedUserInfo: ", parsedUserInfo);
      dispatch(userLogin(parsedUserInfo));
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

      dispatch(userLogin(res));
      setUsername("");
      setPassword("");
    } catch (exception) {
      noti("Wrong username or password", false);
    }
  };

  const handleLogout = () => {
    dispatch(userLogout());
    noti("Logged out successfully!");
  };

  const Blogs = ({ blogs }) => {
    return (
      <>
        <Togglable ref={noteFormRef}>
          <BlogForm noti={noti} />
        </Togglable>
        <div>
          {blogs &&
            blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Blog key={blog.id} blog={blog} user={user} noti={noti} />
              ))}
        </div>
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
        <>
          <div>{blogList()}</div>
          <Router>
            <Switch>
              <Route path="/users/:id">
                <User />
              </Route>
              <Route path="/users">
                <Users />
              </Route>
              <Route path="/">
                <Blogs blogs={blogs} />
              </Route>
            </Switch>
          </Router>
        </>
      )}
    </div>
  );
};

export default App;
