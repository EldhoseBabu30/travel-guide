// src/components/MapboxAutoSuggest.jsx
import React, { useState } from 'react';
import axios from 'axios';
import mapboxSdk from '@mapbox/mapbox-sdk';
import MapboxGeocoder from '@mapbox/mapbox-sdk/services/geocoding';

const mapboxClient = mapboxSdk({ accessToken: 'pk.eyJ1IjoiYWJzaGFuIiwiYSI6ImNseHZ1ajUybTBtbGcyanF6eGFid216OHAifQ.1AXCW22VbJsmDC-2oIm0yw' });
const geocodingService = MapboxGeocoder(mapboxClient);

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

  const handleSelect = async (suggestion) => {
    setQuery(suggestion.place_name);
    setSuggestions([]);

    // Fetch photo from Unsplash API
    const placeImage = await fetchPlaceImage(suggestion.place_name);

    onSelect({ ...suggestion, image_url: placeImage });
  };

  const fetchPlaceImage = async (place) => {
    const UNSPLASH_ACCESS_KEY = 'MyLdu5v_8FGkBtxsCZXGezAd9csefcvbUCaLCoVSJ5A';
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?query=${place}&client_id=${UNSPLASH_ACCESS_KEY}`
    );

    const photos = response.data.results;
    return photos.length > 0 ? photos[0].urls.regular : '';
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
