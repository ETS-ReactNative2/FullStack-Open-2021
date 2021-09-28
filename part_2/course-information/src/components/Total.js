import React from "react";

const Total = ({ course }) => {
  const total = course.parts.reduce((s, part) => {
    return s + part.exercises;
  }, 0);
  return <b>Total of {total} exercises</b>;
};

export default Total;
