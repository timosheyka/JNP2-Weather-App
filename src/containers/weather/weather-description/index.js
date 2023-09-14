import React, {useEffect, useState} from "react";

const noRainyDays = (data) => {
    const day = data.forecast.forecastday;
    for (let i = 0; i < 3; i++)
        if (day[i].day.condition.text.includes('rain')) return false;
    return true;
}

const averageTemp = (data) => {
    const avgtemp_c = data.forecast.forecastday[0].day.avgtemp_c;
    return (18 <= avgtemp_c && avgtemp_c <= 25); 
}

const tempLimits = (data) => {
    const day = data.forecast.forecastday[0].day;
    const min = day.mintemp_c;
    const max = day.maxtemp_c;
    return (15 <= min && max <= 30);
}

const WeatherStatiscis = ({data}) => {
    const [weatherStatus, setWeatherStatus] = useState(null);

    useEffect(() => {
      let weatherPoints = 0;
      if (noRainyDays(data)) weatherPoints++;
      if (averageTemp(data)) weatherPoints++;
      if (tempLimits(data)) weatherPoints++;
  
      let status;
      switch (weatherPoints) {
        case 0:
        case 1:
          status = "not nice";
          break;
        case 2:
          status = "passable";
          break;
        case 3:
          status = "nice";
          break;
        default:
          status = "error";
      }
  
      setWeatherStatus(status);
      console.log('got', weatherPoints, 'points -> status is', status);
    }, [data]);

    return (
        weatherStatus && (
            <p>weather is {weatherStatus}</p>
        )
    )
}

export default WeatherStatiscis;