import React, { useEffect, useState } from "react";
import axios from "axios";

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);
  axios
    .get(
      `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital[0]}`
    )
    .then((response) => {
      console.log(weather);
      setWeather(response.data);
    });

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>region {country.region}</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img alt="flag" src={country.flags.png} width="200" />
      {weather && (
        <div>
          <h3>Weather in {country.capital}</h3>
          <p>
            <b>temperature: </b> {weather.current.temperature}
          </p>
          <img alt="weather" src={weather.current.weather_icons[0]} />
          <p>
            <b>wind: </b>
            {weather.current.wind_speed} mph direction{" "}
            {weather.current.wind_dir}
          </p>
        </div>
      )}
    </>
  );
};

const Content = ({ num, countriesToShow, setCountry }) => {
  if (num === 0) return <p>No country found.</p>;
  else if (num > 10) return <p>Too many matches, please specify the filter.</p>;
  else
    return (
      <>
        {countriesToShow.map((country) => (
          <p key={country.name.common}>
            {country.name.common}
            <button onClick={() => setCountry(country)}>show</button>
          </p>
        ))}
      </>
    );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleChangeValue = (event) => {
    setFilter(event.target.value.toLowerCase());
  };

  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter)
  );

  useEffect(() => {
    const numCountries = Object.keys(countriesToShow).length;
    if (numCountries === 1) setCountry(countriesToShow[0]);
    else setCountry(null);
  }, []);

  return (
    <>
      <div>
        filter countries
        <input value={filter} onChange={handleChangeValue} />
      </div>
      {country ? (
        <Country country={country} />
      ) : (
        <Content
          num={Object.keys(countriesToShow).length}
          countriesToShow={countriesToShow}
          setCountry={setCountry}
        />
      )}
    </>
  );
}

export default App;
