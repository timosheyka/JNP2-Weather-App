import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { WEATHER_API, WEATHER_API_KEY } from "../../config";

const City = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    console.log(inputValue);
    return fetch(`${WEATHER_API}/search.json?key=${WEATHER_API_KEY}&q=''${inputValue}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return {
          options: data.map((city) => {
            return {              
              value: `${city.lat.toFixed(1)},${city.lon.toFixed(1)}`,
              label: `${city.name}, ${city.region}`,
            };
          }),
        };
      });
  };

  const handleOnChange = (searchData) => {
    console.log("Sending", searchData.value);
    setSearch(searchData);
    onSearchChange(searchData.value);
  };

  return (
    <div>
      <p>Choose the city</p>
      <AsyncPaginate
        className="async-paginate"
        placeholder="Search for city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
    </div>
  );
};

export default City;