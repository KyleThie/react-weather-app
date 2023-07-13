import React, { useState } from "react";
import axios from "axios";

// based on a tutoral by https://www.youtube.com/@codecommerce

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  // added .env to protect api key

  const API_KEY = process.env.REACT_APP_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${API_KEY}
  `;

  // added error handling functionality to alert user of invalid search input

  const searchLocation = async (event) => {
    try {
      if (event.key === "Enter") {
        const response = await axios.get(url);
        const data = response.data;
        setData(data);
        console.log(data);
        setLocation("");
      }
    } catch (error) {
      console.log(error);
      window.alert("Please enter a valid city name.");
    }
  };

  return (
    // changed 'App' to 'app' here
    <div className="app">
      <div className="search">
        <input
          value={location}
          onKeyPress={searchLocation}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter a city"
          type="text"
        />
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {/* only returning bottom description info if user searched a city */}
        {data.name != undefined && (
          <div className="bottom">
            <div className="feels">
              <p>Feels Like</p>
              {/* confirming that data.main is accessible before accessing further*/}
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°F</p>
              ) : null}
            </div>
            <div className="humidity">
              <p>Humidity</p>
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            </div>
            <div className="wind">
              <p>Wind Speed</p>
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
