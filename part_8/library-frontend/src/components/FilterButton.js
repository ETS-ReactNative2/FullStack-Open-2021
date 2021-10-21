import React from "react";

const FilterButton = ({ genre, setFilter }) => {
  return <button onClick={() => setFilter(genre)}>{genre}</button>;
};

export default FilterButton;
