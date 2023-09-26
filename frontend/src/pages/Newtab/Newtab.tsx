/**
 * Prologue Comments
 * 
 * Name of code artifact: Newtab Component for RateMyKU Extension
 * Brief description: This component provides a UI for testing the RateMyKU API.
 * Programmer's name: Thomas Nguyen
 * Date the code was created: 09/22/23
 * Brief description of each revision & author:
 *    - Added doc-strings and comments. (Thomas Nguyen @ 09/26/23)
 * Pre-conditions: 
 *    - React and useState hook must be available.
 * Post-conditions:
 *    - Displays API response based on user input.
 * Error and exception condition values: 
 *    - Sets response state to an error message if the fetch fails.
 * Side effects: 
 *    - Modifies the response state to display API data.
 * Invariants: None
 * Any known faults: None
 */

import React, { useState } from 'react';
import './Newtab.css';
import './Newtab.scss';

const Newtab: React.FC = () => {
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
        <div className="App">
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
    );
};

export default Newtab;
