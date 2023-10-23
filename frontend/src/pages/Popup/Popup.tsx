import React, { useState, useEffect } from 'react';
import './Popup.css';

const logo = require('../../assets/img/RateMyKU_Logo.png');

const Popup: React.FC = () => {

    // Debugging output
    useEffect(() => {
        chrome.storage.local.get(['isPopupOn'], (result) => {
            console.log('Fetched state from storage:', result.isPopupOn);  // Added log
            setIsPopupOn(!!result.isPopupOn);
        });
    }, []);

    const [isPopupOn, setIsPopupOn] = useState(false);

    // Load the saved state from chrome.storage when the component mounts
    useEffect(() => {
        chrome.storage.local.get(['isPopupOn'], (result) => {
            console.log('Fetched state from storage:', result.isPopupOn);
            setIsPopupOn(!!result.isPopupOn);
        });
    }, []);

    const togglePopup = () => {
        setIsPopupOn(!isPopupOn);

        chrome.storage.local.set({ isPopupOn: !isPopupOn }, () => {
            console.log('Popup state is set to ', !isPopupOn);
        });

        // Send a message to content script
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentTab = tabs[0]; // Note: We're assuming here that a tab is active and in the current window
            if (currentTab && currentTab.id) {
                chrome.tabs.sendMessage(currentTab.id, { isPopupOn: !isPopupOn }, (response) => {
                    console.log(response);
                    if (chrome.runtime.lastError) {
                        console.error(chrome.runtime.lastError);
                    }
                });
            }
        });
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
