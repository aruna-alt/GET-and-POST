import React, { useState } from 'react';
import './App.css';

function App() {
    const [jsonData, setJsonData] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleJsonInput = (e) => {
        setJsonData(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const parsedData = JSON.parse(jsonData);
            const res = await fetch('https://your-backend-url/bfhl', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(parsedData)
            });
            const result = await res.json();
            setResponse(result);
        } catch (error) {
            alert('Invalid JSON or Error fetching data');
        }
    };

    const handleSelect = (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedOptions(value);
    };

    const renderResponse = () => {
        if (!response) return null;

        return (
            <div className="response-container">
                {selectedOptions.includes('Alphabets') && <p>Alphabets: {response.alphabets.join(', ')}</p>}
                {selectedOptions.includes('Numbers') && <p>Numbers: {response.numbers.join(', ')}</p>}
                {selectedOptions.includes('Highest alphabet') && <p>Highest Alphabet: {response.highest_alphabet.join(', ')}</p>}
            </div>
        );
    };

    return (
        <div className="App">
            <h1>BFHL Frontend</h1>
            <input
                type="text"
                value={jsonData}
                onChange={handleJsonInput}
                placeholder='Enter JSON e.g., { "data": ["A", "B", "1"] }'
            />
            <button onClick={handleSubmit}>Submit</button>
            {response && (
                <select multiple={true} onChange={handleSelect}>
                    <option value="Alphabets">Alphabets</option>
                    <option value="Numbers">Numbers</option>
                    <option value="Highest alphabet">Highest alphabet</option>
                </select>
            )}
            {renderResponse()}
        </div>
    );
}

export default App;
