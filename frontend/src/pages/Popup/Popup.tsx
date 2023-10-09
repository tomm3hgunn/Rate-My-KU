import React, { useState } from 'react';
import './Popup.css';

const logo = require('../../assets/img/RateMyKU_Logo.png');
const Popup: React.FC = () => {
    const [isPopupOn, setIsPopupOn] = useState(false);

    const togglePopup = () => {
        setIsPopupOn(!isPopupOn);

        if(!isPopupOn) {  // When the switch is turned on
            // Use Chrome tabs API to check if a tab with the URL is open
            chrome.tabs.query({url: 'https://classes.ku.edu/*'}, (tabs) => {
                if(tabs.length > 0) {
                    // If a tab with the URL is open, activate it
                    chrome.tabs.update(tabs[0].id, {active: true});
                    if(tabs[0].url !== 'https://classes.ku.edu/') {
                        // If the URL is not exactly 'https://classes.ku.edu/', redirect to it
                        chrome.tabs.update(tabs[0].id, {url: 'https://classes.ku.edu/'});
                    }
                } else {
                    // If no tab with the URL is open, create a new one
                    chrome.tabs.create({url: 'https://classes.ku.edu/'});
                }
            });
        }
    };

    return (
        <div className={`App ${isPopupOn ? 'active' : ''}`}>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>Enable RateMyKU</p>
                <label className="switch">
                    <input type="checkbox" onClick={togglePopup} checked={isPopupOn} />
                    <span className="slider round"></span>
                </label>
            </header>
        </div>
    );
};

export default Popup;
