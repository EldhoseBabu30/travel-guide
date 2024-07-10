import React, { useState } from 'react';
import mapboxSdk from '@mapbox/mapbox-sdk';
import MapboxGeocoder from '@mapbox/mapbox-sdk/services/geocoding';

// Access the environment variable correctly using import.meta.env
const mapboxClient = mapboxSdk({ accessToken: import.meta.env.VITE_MAPBOX_API_KEY });
const geocodingService = mapboxClient.geocoding;

const MapboxAutoSuggest = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    setQuery(e.target.value);

    if (e.target.value) {
      const response = await geocodingService
        .forwardGeocode({
          query: e.target.value,
          autocomplete: true,
          limit: 5,
        })
        .send();

      setSuggestions(response.body.features);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (suggestion) => {
    setQuery(suggestion.place_name);
    setSuggestions([]);
    onSelect(suggestion);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Enter your destination"
        className="border p-2 w-full"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border mt-1 w-full">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleSelect(suggestion)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {suggestion.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MapboxAutoSuggest;
