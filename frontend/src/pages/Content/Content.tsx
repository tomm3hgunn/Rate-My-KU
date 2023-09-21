// react file that will alert on content load
import React from 'react';
import './content.css';

const Content: React.FC = () => {

    // return an alert
    alert("RateMyKU is enabled");
    return (
        <div className="App">
            <header className="App-header">
                <p>RateMyKU is enabled</p>
            </header>
        </div>
    );
}

export default Content;