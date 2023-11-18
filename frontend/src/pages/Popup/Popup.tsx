/**
 * Prologue Comments
 *
 * Name of code artifact: Popup.tsx
 * Brief description: This file contains the code for the popup window that appears when the extension icon is clicked.
 * Programmer's name: Wyatt Parsons
 * Date the code was created: 9/10/23
 * Brief description of each revision & author:
 *    - Added state for toggling settings view (Wyatt Parsons 10/22/23) 
 *    - Added switch communication with content script (Wyatt Parsons 10/22/23) 
 *    - Added logos (Wyatt Parsons 10/22/23) 
 *    - Moved settings order (Wyatt Parsons 11/05/2023)
 *
 * Pre-conditions:
 *   - The extension is installed and enabled.
 *   - The user has clicked on the extension icon.
 * Post-conditions:
 *    - The popup window is displayed.
 *    - The user can toggle the extension on and off.
 *    - The user can toggle the settings view.
 * Error and exception condition values:
 *    - None
 * Side effects:
 *    - None
 * Invariants: None
 * Any known faults: None
 */
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

    // State for toggling the extension on and off
    const [isPopupOn, setIsPopupOn] = useState(false);

    // State for toggling settings view
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

    // Save the state to chrome.storage when the state changes
    useEffect(() => {
        chrome.storage.local.set({ settings });
    }, [settings]);

    // Toggle the extension on and off
    // Toggle the extension on and off
    const togglePopup = () => {
        const newState = !isPopupOn;  // Store the new state in a variable
        setIsPopupOn(newState);  // Update the state

        console.log('Toggling popup. New state:', newState);  // Log the new state to the console

        chrome.storage.local.set({ isPopupOn: newState }, () => {
            console.log('Popup state is saved to storage as', newState);
        });

        // Send a message to content script
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentTab = tabs[0];
            if (currentTab && currentTab.id) {
                chrome.tabs.sendMessage(currentTab.id, { isPopupOn: newState }, (response) => {
                    console.log('Message sent to content script with response:', response);
                    if (chrome.runtime.lastError) {
                        console.error('Error occurred:', chrome.runtime.lastError);
                    }
                });
            }
        });
    };

    // Toggle the settings view
    const toggleSettings = () => {
        setShowSettings(!showSettings); // Toggle between settings and main view
    };

    // Type for settings keys
    type SettingKeys = 'showRating' | 'showDifficulty' | 'showDepartment' | 'showWouldTakeAgain' | 'showTotalRatings';

    // Handle a change in a setting
    const handleSettingChange = (setting: SettingKeys) => {
        setSettings(prevSettings => ({
            ...prevSettings,
            [setting]: !prevSettings[setting]
        }));
    };
    const handleSignIn = () => {
        console.log('About to call getAuthToken');

        chrome.identity.getAuthToken({ interactive: true }, function (token) {
            console.log('getAuthToken callback');

            if (chrome.runtime.lastError) {
                console.log('Runtime error:', chrome.runtime.lastError);
                return;
            }

            // Use the token here
            console.log('Token:', token);
        });

        console.log('Called getAuthToken');
    };

    // Render the component
    return (
        <div className={`App ${isPopupOn ? 'active' : ''}`}>
            {showSettings ? (
                // Settings view
                <div className="settings">
                    <div onClick={toggleSettings} className="back">Back</div>
                    <h2>Settings</h2>
                    Show Difficulty
                    <input
                        type="checkbox"
                        checked={settings.showDifficulty}
                        onChange={() => handleSettingChange('showDifficulty')}
                    />
                    <label>
                        Show Rating
                        <input
                            type="checkbox"
                            checked={settings.showRating}
                            onChange={() => handleSettingChange('showRating')}
                        />
                    </label>
                    <label>

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
            <button onClick={handleSignIn}>Sign In with Google</button>

        </div>
    );
};

export default Popup;
