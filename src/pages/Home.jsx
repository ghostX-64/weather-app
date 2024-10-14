import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather, fetchForecast } from '../store/weatherSlice';
import './Home.css';
import celsiusIcon from '../assets/Celsius.gif';
import cloudsIcon from '../assets/Clouds.gif';
import cloudyIcon from '../assets/Cloudy.gif';
import rainIcon from '../assets/Rain.gif';
import stormIcon from '../assets/Storm.gif';
import sunIcon from '../assets/Sun.gif';
import hazeIcon from '../assets/haze.gif';
import temperatureIcon from '../assets/Temperature.gif';
import windIcon from '../assets/Wind.gif';

const Home = () => {
  const [location, setLocation] = useState('');
  const dispatch = useDispatch();
  const { currentWeather, forecast, status } = useSelector((state) => state.weather);

  const handleSearch = () => {
    if (location) {
      dispatch(fetchWeather(location));
      dispatch(fetchForecast(location));
    }
  };

  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const formatDate = () => {
    const now = new Date();
    const day = now.toLocaleDateString('en-US', { weekday: 'long' });
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${day}, ${time}`;
  };

  const getWeatherIcon = (weatherDescription) => {
    if (weatherDescription.includes('sun')) {
      return sunIcon;
    } else if (weatherDescription.includes('clouds')) {
      return cloudsIcon;
    } else if (weatherDescription.includes('cloudy')) {
      return cloudyIcon;
    } else if (weatherDescription.includes('rain')) {
      return rainIcon;
    } else if (weatherDescription.includes('storm')) {
      return stormIcon;
    } else if (weatherDescription.includes('wind')) {
      return windIcon;
    } else if (weatherDescription.includes('haze')) {
      return hazeIcon;
    }
    return sunIcon;
  };

  const getWeatherBackground = (weatherDescription) => {
    if (weatherDescription.includes('clear sky')) {
      return 'linear-gradient(to bottom, #a1c4fd, #c2e9fb)';
    } else if (weatherDescription.includes('sun')) {
      return 'linear-gradient(to bottom, #ffeb3b, #fbc02d)';
    } else if (weatherDescription.includes('clouds') || weatherDescription.includes('cloudy')) {
      return 'linear-gradient(to bottom, #90caf9, #42a5f5)';
    } else if (weatherDescription.includes('rain')) {
      return 'linear-gradient(to bottom, #64b5f6, #1976d2)';
    } else if (weatherDescription.includes('storm')) {
      return 'linear-gradient(to bottom, #ef5350, #d32f2f)';
    } else if (weatherDescription.includes('haze')) {
      return 'linear-gradient(to bottom, #b0c4de, #708090)';
  }
    
    return 'linear-gradient(to bottom, #fff, #fff)';
  };

  useEffect(() => {
    if (currentWeather) {
      console.log('Current Weather:', currentWeather);
    }
    if (forecast.length > 0) {
      console.log('Forecast:', forecast);
    }
  }, [currentWeather, forecast]);

  const uniqueForecasts = forecast.reduce((acc, current) => {
    const date = current.dt_txt.split(' ')[0];
    if (!acc.some(item => item.dt_txt.split(' ')[0] === date)) {
      acc.push(current);
    }
    return acc;
  }, []).slice(0, 5);

  return (
    <div className="home-container">
      <h1>Weather App</h1>
      <div className="search-bar">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {status === 'loading' && <p>Loading...</p>}

      <div className="weather-content">
        {currentWeather && (
          <div className="weather-card" style={{ background: getWeatherBackground(currentWeather.weather[0].description) }}>
            <div className="weather-header">
              <h2>{currentWeather.name}</h2>
              <p>{formatDate()} - {currentWeather.weather[0].description}</p>
            </div>
            <div className="weather-main">
              <img
                src={getWeatherIcon(currentWeather.weather[0].description)}
                alt="Weather Icon"
                className="weather-icon"
              />
              <p className="temperature">
                {currentWeather.main.temp}°C
              </p>
            </div>
            <div className="weather-details">
              <div className="feels-max-min">
                <p>Feels like: {currentWeather.main.feels_like.toFixed(2)} °C</p>
                <p>Max Temp: {currentWeather.main.temp_max.toFixed(2)} °C</p>
                <p>Min Temp: {currentWeather.main.temp_min.toFixed(2)} °C</p>
              </div>
            </div>
          </div>
        )}

        {uniqueForecasts.length > 0 && (
          <div className="forecast-section">
            <h3>5-Day Forecast </h3>
            <div className="forecast-cards">
              {uniqueForecasts.map((day, index) => (
                <div key={index} className="forecast-card" style={{ background: getWeatherBackground(day.weather[0].description) }}>
                  <p>{getDayOfWeek(day.dt_txt)}</p>
                  <img src={getWeatherIcon(day.weather[0].description)} alt="Weather Icon" className="forecast-icon" />
                  <p>Temp: {day.main.temp.toFixed(2)} °C</p>
                  <p>{day.weather[0].description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
