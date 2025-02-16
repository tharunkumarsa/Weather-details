import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const fetchWeatherDetails = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      setWeatherData(null);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0aab57c8751989b303b34fb36783d3bf&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found or API error.");
      }

      const data = await response.json();
      setWeatherData(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch weather details. Check city name or try again.");
      setWeatherData(null);
    }
  };

  return (
    <div className="home-container">
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
      
      <h1>Weather Information</h1>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeatherDetails}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-details">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p><strong>Temperature:</strong> {weatherData.main.temp}°C</p>
          <p><strong>Weather:</strong> {weatherData.weather[0].description}</p>
          <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
          <p><strong>Wind Speed:</strong> {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Home;
