import React, { useEffect, useState } from "react";
import axios from "axios";

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital[0]}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, []);

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
            <b>temperature: </b> {weather.current.temperature} Celsius
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

export default Country;
