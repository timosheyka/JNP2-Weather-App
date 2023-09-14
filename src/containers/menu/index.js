import React, { useState } from 'react';
import GeoLocation from '../geolocation';
import City from '../city-choice';

const Menu = ({ onCurrentCoordinatesChange }) => {
    const [currentTab, setCurrentTab] = useState('1');
    const [receivedCoordinates, setReceivedCoordinates] = useState(null);

    const handleOnSearchChange = (receivedCoordinates) => {
        console.log("Received coords", receivedCoordinates);
        setReceivedCoordinates(receivedCoordinates);
    }

    const tabs = [
        { id: 1, tabTitle: 'GeoLocation', content: <GeoLocation onSearchChange={handleOnSearchChange}/> },
        { id: 2, tabTitle: 'City Choice', content: <City onSearchChange={handleOnSearchChange}/> },
    ];

    React.useEffect(() => {
        onCurrentCoordinatesChange(receivedCoordinates);
    }, [receivedCoordinates, onCurrentCoordinatesChange]);

    return (
        <div className='container'>
            <div className='tabs'>
                {tabs.map((tab, i) => 
                    <button key={i} id={tab.id} disabled={currentTab === `${tab.id}`} onClick={((e) => { setCurrentTab(e.target.id); })}>{tab.tabTitle}</button> )}
            </div>
            <div className='content'>
                {tabs.map((tab, i) => <div key={i}> {currentTab === `${tab.id}` && tab.content}</div> )}
            </div>
        </div>
    );
}

export default Menu;
