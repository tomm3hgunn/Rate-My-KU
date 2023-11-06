// LandingPage.tsx
import React, { useState } from 'react';
import './LandingPage.css'; // Create or rename Newtab.css to LandingPage.css
import './LandingPage.scss'; // Create or rename Newtab.scss to LandingPage.scss
import NavBar from './components/NavBar'; // Adjust the import path if necessary

const LandingPage: React.FC<{ onBackToNewTab?: () => void }> = ({ onBackToNewTab }) => {
    // State variables for storing API parameters and response
    const [baseUrl, setBaseUrl] = useState<string>('ratemyprofessorapi.onrender.com/');
    const [endpoint, setEndpoint] = useState<string>('get_professor_data');
    const [queryParams, setQueryParams] = useState<string>('');
    const [response, setResponse] = useState<any>(null);

    /**
    * Handles the form submission to fetch data from the API.
    */
    const handleSubmit = () => {
        // Construct the full API URL
        const url = `https://${baseUrl}${endpoint}${queryParams ? '?' + queryParams : ''}`;
        console.log(url);
        // Fetch data from the API
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                // Update the response state with the fetched data
                setResponse(data);
            })
            .catch((error) => {
                // Update the response state with an error message
                setResponse({ error: 'Failed to fetch data' });
            });
    };
    return (
        <div>
            <div className="main-content">
                {/* Content from the original NewTab component */}

                <h1>Test RateMyKU API Hosted on Render!</h1>
                <div className="search-container">
                    {/* Input for the base URL */}
                    <input
                        type="text"
                        value={baseUrl}
                        onChange={(e) => setBaseUrl(e.target.value)}
                        className="search-bar"
                    />
                    {/* Dropdown for selecting the API endpoint */}
                    <select onChange={(e) => setEndpoint(e.target.value)} className="dropdown">
                        <option value="get_professor_data">get_professor_data_updated</option>
                        <option value="get_professor_data">get_professor_data</option>
                        <option value="hello_world">hello_world</option>
                    </select>
                    {/* Input for query parameters */}
                    <input
                        type="text"
                        placeholder="name=Gibbons"
                        onChange={(e) => setQueryParams(e.target.value)}
                        className="query-params"
                    />
                    {/* Submit button */}
                    <button onClick={handleSubmit} className="submit-button">
                        Submit
                    </button>
                </div>
                {/* Container for displaying the API response */}
                <div className="response-container">
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            </div>
            {/* Optionally, add a back button if there's somewhere to go back to */}
            {onBackToNewTab && (
                <button onClick={onBackToNewTab} className="back-button">
                    Back
                </button>
            )}
        </div>
    );
};

export default LandingPage;
