import React, { useState, useEffect } from 'react';
import './Popup.css';

const logo = require('../../assets/img/RateMyKU_Logo.png');
const cog = require('../../assets/img/cog.png');

const Popup: React.FC = () => {

    const [showSettings, setShowSettings] = useState(false); // Added state for toggling settings view

    //! Debugging output
    useEffect(() => {
        chrome.storage.local.get(['isPopupOn'], (result) => {
            console.log('Fetched state from storage:', result.isPopupOn);  // Added log
            setIsPopupOn(!!result.isPopupOn);
        });
    }, []);

    const [isPopupOn, setIsPopupOn] = useState(false);

    const [settings, setSettings] = useState({
        showRating: true,
        showDifficulty: true,
        showDepartment: true,
        showWouldTakeAgain: true,
        showTotalRatings: true
    });

    // Load the saved state from chrome.storage when the component mounts
    useEffect(() => {
        chrome.storage.local.get('settings', (result) => {
            if (result.settings) {
                setSettings(result.settings);
            }
        });
    }, []);


    useEffect(() => {
        chrome.storage.local.set({ settings });
    }, [settings]);


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

    const toggleSettings = () => {
        setShowSettings(!showSettings); // Toggle between settings and main view
    };

    type SettingKeys = 'showRating' | 'showDifficulty' | 'showDepartment' | 'showWouldTakeAgain' | 'showTotalRatings';

    const handleSettingChange = (setting: SettingKeys) => {
        setSettings(prevSettings => ({
            ...prevSettings,
            [setting]: !prevSettings[setting]
        }));
    };


    return (
        <div className={`App ${isPopupOn ? 'active' : ''}`}>
            {showSettings ? (
                // Settings view
                <div className="settings">
                    <div onClick={toggleSettings} className="back">Back</div>
                    <h2>Settings</h2>
                    <label>
                        Show Rating
                        <input
                            type="checkbox"
                            checked={settings.showRating}
                            onChange={() => handleSettingChange('showRating')}
                        />
                    </label>
                    <label>
                        Show Difficulty
                        <input
                            type="checkbox"
                            checked={settings.showDifficulty}
                            onChange={() => handleSettingChange('showDifficulty')}
                        />
                    </label>
                    <label>
                        Show Department
                        <input
                            type="checkbox"
                            checked={settings.showDepartment}
                            onChange={() => handleSettingChange('showDepartment')}
                        />
                    </label>
                    <label>
                        Show "Would Take Again"
                        <input type="checkbox"
                            checked={settings.showWouldTakeAgain}
                            onChange={() => handleSettingChange('showWouldTakeAgain')}
                        />
                    </label>
                    <label>
                        Show Total Ratings
                        <input
                            type="checkbox"
                            checked={settings.showTotalRatings}
                            onChange={() => handleSettingChange('showTotalRatings')}
                        />
                    </label>

                </div>
            ) : (
                // Main view
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>Enable RateMyKU</p>
                    <label className="switch">
                        <input type="checkbox" onClick={togglePopup} checked={isPopupOn} />
                        <span className="slider round"></span>
                    </label>
                    <img src={cog} className="cog-logo" alt="cog logo" onClick={toggleSettings} />
                </header>
            )}
        </div>
    );
};

export default Popup;
