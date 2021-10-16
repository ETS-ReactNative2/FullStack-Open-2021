import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Users from "./components/Users";
import User from "./components/User";
import BlogDetail from "./components/BlogDetail";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import loginService from "./services/login";
import { updateNotification } from "./reducer/notificationReducer";
import { initBlogs, createNewBlog } from "./reducer/blogReducer";
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

    if (loggedUserInfo) {
      const parsedUserInfo = JSON.parse(loggedUserInfo);
      dispatch(userLogin(parsedUserInfo));
    }
  }, []);

  const noti = (message, isSuccess = true) => {
    dispatch(updateNotification(message, isSuccess));
  };

  const createBlog = async (newBlog) => {
    try {
      noteFormRef.current.toggleVisibility();
      await dispatch(createNewBlog(newBlog));
      noti(`A new blog ${newBlog.title} by ${newBlog.author}`);
    } catch (err) {
      console.log(err);
    }
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
    console.log("render blogs");
    return (
      <>
        <Togglable ref={noteFormRef}>
          <BlogForm noti={noti} createBlog={createBlog} />
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

  const padding = {
    padding: "5px",
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
          <Router>
            <div>
              <Link style={padding} to="/">
                blogs
              </Link>
              <Link style={padding} to="/users">
                users
              </Link>
              {`${user.username} logged in`}
              <button onClick={handleLogout}>logout</button>
            </div>
            <h2>blogs</h2>
            <Switch>
              <Route path="/users/:id">
                <User />
              </Route>
              <Route path="/blogs/:id">
                <BlogDetail />
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
