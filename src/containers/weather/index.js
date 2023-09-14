import React, { useState, useEffect } from "react";
import { WEATHER_API, WEATHER_API_KEY } from "../../config";
import WeatherDisplay from "./weather-display";
import { DotLoader } from "react-spinners";
import './index.css';
import WeatherStatiscis from "./weather-description";
import WeatherGif from "./weather-gif";

const Weather = ({ coordinates }) => {
    const [weather, setWeather] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (coordinates && !loaded) {
                    const response = await fetch(`${WEATHER_API}/forecast.json?key=${WEATHER_API_KEY}&q=${coordinates}&days=3`);
                    const data = await response.json();
                    setWeather(data);
                    setLoaded(true);
                    console.log(data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [coordinates, loaded]); 

    useEffect(() => {
        setWeather(null);
        setLoaded(false);
    }, [coordinates]);

    return (
        <div className="weather-container">
            { weather 
                ? ( <div>
                        <h2>Weather Info</h2>
                        <p className="city">
                            {weather.location.name}, 
                            {weather.location.region || weather.location.name},  
                            {weather.location.country}
                        </p>
                        <WeatherStatiscis data={weather}/>
                        <WeatherDisplay data={weather}/>
                        <WeatherGif search={weather.current.condition.text}/>
                    </div> )
                : <div className="loader"><DotLoader/></div>    
            }
        </div>
    );
}

export default Weather;