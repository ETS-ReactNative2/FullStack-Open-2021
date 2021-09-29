import React, { useEffect, useState } from "react";
import Content from "./components/Content";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleChangeValue = (event) => {
    setFilter(event.target.value.toLowerCase());
  };

  return (
    <>
      <div>
        filter countries
        <input value={filter} onChange={handleChangeValue} />
      </div>
      <Content countries={countries} filter={filter} />
    </>
  );
}

export default App;
