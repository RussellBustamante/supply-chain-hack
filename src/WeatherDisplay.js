import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherDisplay = ({ lat, lng }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&exclude=minutely,alerts&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`);
      setWeatherData(response.data);
    };

    fetchWeather();
  }, [lat, lng]);

  return (
    <div>
      {weatherData && (
        <div>
          <h2>Current Weather</h2>
          <h3>{weatherData.current.weather[0].main}</h3>
          <p>Temperature: {weatherData.current.temp}</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
          <p>Wind Speed: {weatherData.current.wind_speed}</p>

          <h2>Hourly Forecast</h2>
          {weatherData.hourly.map((hour, index) => (
            <div key={index}>
              <h3>{new Date(hour.dt * 1000).toLocaleTimeString()}</h3>
              <p>{hour.weather[0].main}</p>
              <p>Temperature: {hour.temp}</p>
            </div>
          ))}

          <h2>Daily Forecast</h2>
          {weatherData.daily.map((day, index) => (
            <div key={index}>
              <h3>{new Date(day.dt * 1000).toLocaleDateString()}</h3>
              <p>{day.weather[0].main}</p>
              <p>Temperature: {day.temp.day}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
