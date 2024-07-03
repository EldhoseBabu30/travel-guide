// src/pages/AiTravel/AiHotel.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MapGL from 'react-map-gl';

const AiHotel = () => {
  const navigate = useNavigate();
  const [hotelRating, setHotelRating] = useState('');
  const [radius, setRadius] = useState(10);
  const [reviewRating, setReviewRating] = useState('');

  const handleContinue = () => {
    navigate('/ai-food');
  };

  return (
    <div className="flex h-screen bg-gray-100 p-4">
      <div className="w-1/3 p-4">
        <h2 className="text-xl font-bold mb-4">Select Hotel Star Rating</h2>
        {['1 star', '2 star', '3 star', '4 star', '5 star', '7 star'].map((rating) => (
          <button
            key={rating}
            className={`mb-2 p-2 w-full ${hotelRating === rating ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setHotelRating(rating)}
          >
            {rating}
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
        <h2 className="text-xl font-bold mb-4">Select Review Rating</h2>
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            className={`mb-2 p-2 w-full ${reviewRating === rating ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setReviewRating(rating)}
          >
            {rating} star
          </button>
        ))}
      </div>
      <div className="w-2/3 p-4">
        <MapGL
          width="100%"
          height="400px"
          latitude={40}
          longitude={-100}
          zoom={3}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxApiAccessToken={'pk.eyJ1IjoiYWJzaGFuIiwiYSI6ImNseHZ1ajUybTBtbGcyanF6eGFid216OHAifQ.1AXCW22VbJsmDC-2oIm0yw'}
        />
        <div className="mt-4">
          <button
            onClick={handleContinue}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiHotel;
