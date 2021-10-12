import React from "react";
import { connect } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { updateNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    props.voteAnecdote(anecdote.id);
    props.updateNotification(`You voted '${anecdote.content}'`, 5);
  };
  return (
    <>
      {props.anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter((a) =>
      a.content.toLowerCase().includes(state.filter)
    ),
  };
};

const mapDispatchToProps = {
  voteAnecdote,
  updateNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
