// src/components/AiFood.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Map from 'react-map-gl';

const AiFood = () => {
  const navigate = useNavigate();
  const [foodType, setFoodType] = useState('');
  const [radius, setRadius] = useState(10);
  const [rating, setRating] = useState('');

  const handleFinalize = () => {
    navigate('/ai-finalize');
  };

  return (
    <div className="flex h-screen bg-gray-100 p-4">
      <div className="w-1/3 p-4">
        <h2 className="text-xl font-bold mb-4">Select Your Food</h2>
        {['Indian', 'Italian', 'Chinese', 'Japanese', 'Mexican', 'Veg', 'Non-Veg'].map((type) => (
          <button
            key={type}
            className={`mb-2 p-2 w-full ${foodType === type ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setFoodType(type)}
          >
            {type}
          </button>
        ))}
        <h2 className="text-xl font-bold mb-4">Select Radius</h2>
        <input
          type="range"
          min="1"
          max="50"
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          className="mb-4 w-full"
        />
        <h2 className="text-xl font-bold mb-4">Select Rating</h2>
        {[1, 2, 3, 4, 5].map((ratingValue) => (
          <button
            key={ratingValue}
            className={`mb-2 p-2 w-full ${rating === ratingValue ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setRating(ratingValue)}
          >
            {ratingValue} star
          </button>
        ))}
      </div>
      <div className="w-2/3 p-4">
        <Map
          initialViewState={{
            longitude: -100,
            latitude: 40,
            zoom: 3,
          }}
          style={{ width: '100%', height: '400px' }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
        />
        <div className="mt-4">
          <button
            onClick={handleFinalize}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Finalize
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiFood;
