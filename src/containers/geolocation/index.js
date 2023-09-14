import React, { useState, useEffect } from 'react';

const geolocationAPI = navigator.geolocation;

const GeoLocation = ({ onSearchChange }) => {
    const [latText, setLatText] = useState('');
    const [longText, setLongText] = useState('');

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                if (!latText && !longText) {

                    const position = await new Promise((resolve, reject) => {
                        geolocationAPI.getCurrentPosition(resolve, reject);
                    });

                    const latitude = position.coords.latitude.toFixed(1);
                    const longitude = position.coords.longitude.toFixed(1);
                    
                    setLatText(latitude);
                    setLongText(longitude);
                    
                    console.log("Sending", `${latitude},${longitude}`);
                    onSearchChange(`${latitude},${longitude}`);
                }
            } catch (error) {
                console.error("Error fetching geolocation:", error);
            }
        };

        fetchLocation();
    }, [latText, longText, onSearchChange]);

    return (
        <div>
            <p>Current Geographical Location</p>
            <p>Your Latitude is {latText}° and Longitude is {longText}°</p>
        </div>
    );
}

export default GeoLocation;
