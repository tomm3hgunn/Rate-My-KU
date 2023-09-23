import React, { useState } from 'react';
import './Newtab.css';
import './Newtab.scss';

const Newtab: React.FC = () => {
    const [baseUrl, setBaseUrl] = useState<string>('ratemyprofessorapi.onrender.com/');
    const [endpoint, setEndpoint] = useState<string>('get_professor_data');
    const [queryParams, setQueryParams] = useState<string>('');
    const [response, setResponse] = useState<any>(null);

    const handleSubmit = () => {
        const url = `https://${baseUrl}${endpoint}${queryParams ? '?' + queryParams : ''}`;
        console.log(url);
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setResponse(data);
            })
            .catch((error) => {
                setResponse({ error: 'Failed to fetch data' });
            });
    };


    return (
        <div className="App">
            <h1>Test RateMyKU API Hosted on Render!</h1>
            <div className="search-container">
                <input
                    type="text"
                    value={baseUrl}
                    onChange={(e) => setBaseUrl(e.target.value)}
                    className="search-bar"
                />
                <select onChange={(e) => setEndpoint(e.target.value)} className="dropdown">
                    <option value="get_professor_data">get_professor_data</option>
                    <option value="hello_world">hello_world</option>
                </select>
                <input
                    type="text"
                    placeholder="name=Gibbons"
                    onChange={(e) => setQueryParams(e.target.value)}
                    className="query-params"
                />
                <button onClick={handleSubmit} className="submit-button">
                    Submit
                </button>
            </div>
            <div className="response-container">
                <pre>{JSON.stringify(response, null, 2)}</pre>
            </div>
        </div>
    );
};

export default Newtab;
