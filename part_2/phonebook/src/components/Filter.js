import React from "react";

const Filter = ({ filterValue, setFilterValue }) => {
  const handleChangeFilterValue = (event) => {
    setFilterValue(event.target.value.toLocaleLowerCase());
  };

  return (
    <div>
      filter shown with
      <input value={filterValue} onChange={handleChangeFilterValue} />
    </div>
  );
};

export default Filter;
