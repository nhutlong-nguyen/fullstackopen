import { useEffect, useState } from 'react';
import axios from 'axios';

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (country) {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}&units=metric`;

      axios.get(url)
        .then(response => {
          setWeather(response.data);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    }
  }, [country]);

  // URL for weather icon
  const iconUrl = weather && `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <p><strong>languages:</strong></p>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      
      {weather && (
        <div>
          <h2><strong>Weather in {country.capital}</strong></h2>
          <p>temperature {weather.main.temp} Celsius</p>
          <img src={iconUrl} alt="Weather icon" />
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default CountryDetail;
