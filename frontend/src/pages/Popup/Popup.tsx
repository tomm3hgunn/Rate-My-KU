// Hex color: #146091
import React, { useState } from 'react';
import './Popup.css';

const logo = require('../../assets/img/RateMyKU_Logo.png');
const Popup: React.FC = () => {
    const [isPopupOn, setIsPopupOn] = useState(false);

    const togglePopup = () => {
        setIsPopupOn(!isPopupOn);
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