import React, { useState, useEffect } from "react";
import Select from "react-select";
import '../index.css';
import { DotLoader } from "react-spinners";

const DAYS = 3;
const HOURS = 24;

const FORECAST_TYPES = [
    { value: "hourly", label: "Hourly" },
    { value: "daily", label: "Daily" },
    { value: "current", label: "Current" },
];

const WeatherDay = ({ data, current = null, time = null }) => {    
    const imgData = current ? current : data.day;
    return (
        <div className="item">
            <img src={imgData.condition.icon} alt={imgData.condition.text} />
            <div>{time || data.date}</div>
            <div>{time ? data.hour[Number(time.split(' ')[1].split(':')[0])].temp_c : data.day.avgtemp_c}°C</div>
            <div>{data.day.mintemp_c} - {data.day.maxtemp_c}°C</div>
        </div>
    )
}

const WeatherHours = ({data}) => {
    return (
        <div className="item">
            <img src={data.condition.icon} alt={data.condition.text} />
            <div>{data.time}</div>
            <div>{data.temp_c}°C</div>
        </div>
    )
}

const WeatherDisplay = ({ data }) => {
    const initialSelectedOption = JSON.parse(localStorage.getItem("selectedOption")) || FORECAST_TYPES[0];
    const [selectedOption, setSelectedOption] = useState(initialSelectedOption);
    const handleChange = (selected) => { setSelectedOption(selected); };
    
    useEffect(() => {
        localStorage.setItem("selectedOption", JSON.stringify(selectedOption));
    }, [selectedOption]);

    let Display = null;
    switch (selectedOption.value) {
        case 'current':
            Display = 
                <WeatherDay 
                    key="current" 
                    data={data.forecast.forecastday[0]}
                    current={data.current}
                    time={data.current.last_updated}
                />;
            break;
        case 'daily':
            const forecast = data.forecast.forecastday;
            Display = forecast.slice(0, DAYS).map((day, index) => (
                <WeatherDay key={index} data={day} />
            ));
            break;
        case 'hourly':
            const hour = Number(data.current.last_updated.split(' ')[1].split(':')[0]);
            const forecast_by_hours = data.forecast.forecastday[0].hour;
            Display = forecast_by_hours.slice(hour, hour + HOURS).map((hourData, index) => (
                <WeatherHours key={index} data={hourData} />
            ));
            break;              
        default:
            Display = null;
    }

    return (
        <div>
            <div className="select-container">
                <Select
                    className="select"
                    value={selectedOption}
                    options={FORECAST_TYPES}
                    onChange={handleChange}
                />
            </div>
            { Display
                ? ( <div className="display-container">{Display}</div> )
                : ( <div><DotLoader/></div> )
            }
        </div>
    );
};

export default WeatherDisplay;
