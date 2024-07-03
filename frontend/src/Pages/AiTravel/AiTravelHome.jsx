// src/components/AiTravelHome.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import MapboxAutoSuggest from './MapboxAutoSuggest';

const AiTravelHome = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');

  const handlePlanTrip = () => {
    navigate('/ai-select');
  };

  const handleDestinationSelect = (suggestion) => {
    setDestination(suggestion.place_name);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <Player
        autoplay
        loop
        src="https://assets.lottiefiles.com/packages/lf20_k6ciujc2.json"
        style={{ height: '300px', width: '300px' }}
      />
      <h1 className="text-3xl font-bold mb-4">Plan Your Next Adventure with AI Travel Planner</h1>
      <MapboxAutoSuggest onSelect={handleDestinationSelect} />
      <button
        onClick={handlePlanTrip}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
      >
        Plan Trip
      </button>
      <p className="mt-4 text-gray-600">Your personal AI travel assistant</p>
    </div>
  );
};

export default AiTravelHome;
