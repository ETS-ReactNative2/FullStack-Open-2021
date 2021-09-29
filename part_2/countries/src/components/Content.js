import React, { useEffect, useState } from "react";
import Country from "./Country";

const Content = ({ countries, filter }) => {
  const [countriesToShow, setCountriesToShow] = useState([]);
  useEffect(() => {
    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(filter)
    );
    setCountriesToShow(filteredCountries);
  }, [filter]);

  const len = Object.keys(countriesToShow).length;
  if (len === 0) return <p>No coutry found.</p>;
  else if (len > 10) return <p>Too many matches, please specify the filter.</p>;
  else if (len === 1) return <Country country={countriesToShow[0]} />;
  else {
    return (
      <>
        {countriesToShow.map((country) => (
          <p key={country.name.common}>
            {country.name.common}
            <button onClick={() => setCountriesToShow([country])}>show</button>
          </p>
        ))}
      </>
    );
  }
};

export default Content;
