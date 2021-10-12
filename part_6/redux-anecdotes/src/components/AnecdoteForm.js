import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { connect } from "react-redux";

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    props.createAnecdote(event.target.content.value);
    event.target.content.value = "";
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input type="text" name="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

// pass { createAnecdote } instead of creating a mapDispatchToProps function
export default connect(null, { createAnecdote })(AnecdoteForm);
