import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { LOGIN } from "../queries";

const LoginForm = ({ show, setToken, setError, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  const handleLogin = (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
    setUsername("");
    setPassword("");
  };

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      window.localStorage.setItem("loggedUsers", token);
      setToken(token);
      setPage("books");
    }
  }, [result.data]); // eslint-disable-line

  if (!show) return null;
  return (
    <form onSubmit={handleLogin}>
      <div>
        username:
        <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
