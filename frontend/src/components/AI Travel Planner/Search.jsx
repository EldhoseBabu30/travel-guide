import React, { useState } from 'react';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
    const data = await response.json();
    setResults(data);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Locations</h1>
      <input
        type="text"
        placeholder="Search for a location"
        className="border p-2 mb-4 w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white p-2 mb-4 w-full">Search</button>
      <ul>
        {results.map((result, index) => (
          <li key={index} className="mb-2">{result.display_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
