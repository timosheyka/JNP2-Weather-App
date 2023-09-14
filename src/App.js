import React, { useContext, useState } from "react";
import "./App.css";
import { ThemeContext } from "./theme";
import Header from "./containers/header";
import Menu from "./containers/menu";
import Weather from "./containers/weather";

function App() {
  const { theme } = useContext(ThemeContext);
  const [coordinates, setCoordinates] = useState(null);

  const handleCurrentCoordinatesChange = (coords) => {
    setCoordinates(coords);
  };

  return (
    <div className={`App ${theme}`}>
      <Header/>
      <Menu onCurrentCoordinatesChange={handleCurrentCoordinatesChange}/>
      <Weather coordinates={coordinates}/>
    </div>
  );
}

export default App;
