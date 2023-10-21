import React, { useState, useEffect } from 'react';
import './Popup.css';

const logo = require('../../assets/img/RateMyKU_Logo.png');

const Popup: React.FC = () => {
    const [isPopupOn, setIsPopupOn] = useState(false);

    // Load the saved state from chrome.storage when the component mounts
    useEffect(() => {
        chrome.storage.local.get(['isPopupOn'], (result) => {
            setIsPopupOn(!!result.isPopupOn);
        });
    }, []);

    const togglePopup = () => {
        const newPopupState = !isPopupOn;
               
        // Save the new state to chrome.storage
        chrome.storage.local.set({ isPopupOn: newPopupState }, () => {
            console.log('Value is set to ' + newPopupState);
        });

        setIsPopupOn(newPopupState);

        // Send a message to the content script with the new state
        chrome.runtime.sendMessage({isPopupOn: newPopupState});

        if (newPopupState) {  // When the switch is turned on
            // Your existing code to handle the "turn on" functionality
            chrome.tabs.query({ url: 'https://classes.ku.edu/*' }, (tabs) => {
                if (tabs.length > 0) {
                    chrome.tabs.update(tabs[0].id, { active: true });
                    if (tabs[0].url !== 'https://classes.ku.edu/') {
                        chrome.tabs.update(tabs[0].id, { url: 'https://classes.ku.edu/' });
                    }
                } else {
                    chrome.tabs.create({ url: 'https://classes.ku.edu/' });
                }
            });
        } else {  // When the switch is turned off
            // Your existing code to handle the "turn off" functionality
            chrome.tabs.query({ url: 'https://classes.ku.edu/*' }, (tabs) => {
                if (tabs.length > 0) {
                    chrome.tabs.remove(tabs[0].id);
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
