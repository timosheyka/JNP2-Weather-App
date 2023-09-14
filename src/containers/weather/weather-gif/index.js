import React, {useEffect, useState} from "react";
import { TENOR_API, TENOR_API_KEY } from "../../../config";
import { DotLoader } from "react-spinners";
import "../index.css";

const WeatherGif = ({ search }) => {
    const [gif, setGif] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (search) {
                    const response = await fetch(`${TENOR_API}/search?key=${TENOR_API_KEY}&q="${search}"&limit=1`)
                    const data = await response.json();
                    setGif(data.results[0]);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [search]);

    return (
        <div className="gif-container">
            { gif 
                ? <img className="gif-item" src={gif.media_formats.gif.url} alt=" "/>
                : <DotLoader/>
            }
            <p>Weather is {search}</p>
        </div>
    )
}

export default WeatherGif;