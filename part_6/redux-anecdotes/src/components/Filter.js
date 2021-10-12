import React from "react";
import { updateFilter } from "../reducers/filterReducer";
import { connect } from "react-redux";

const Filter = (props) => {
  const handleChange = (event) => {
    props.updateFilter(event.target.value.toLowerCase());
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = { updateFilter };

export default connect(null, mapDispatchToProps)(Filter);
