import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userService from "../services/user";

const User = () => {
  const [user, setUser] = useState(null);
  const id = useParams().id;
  useEffect(
    () =>
      userService
        .get(id)
        .then((returnedUser) => setUser(returnedUser))
        .catch((err) => console.log(err)),
    [id]
  );
  if (!user) return null;
  return (
    <>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};

export default User;
