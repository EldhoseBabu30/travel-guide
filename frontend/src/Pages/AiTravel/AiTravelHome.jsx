// src/pages/AiTravelHome.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import MapboxAutoSuggest from './MapboxAutoSuggest';
import travel from '../../assets/Lottiefiles/travel.json';
import { useTravelContext } from '../../Pages/AiTravel/AiContext/AiContext';

const AiTravelHome = () => {
  const navigate = useNavigate();
  const { setTravelData } = useTravelContext();
  const [destination, setDestination] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handlePlanTrip = () => {
    if (!destination) {
      setAlertMessage('Please enter your destination before planning your trip.');
      return;
    }
    setAlertMessage('');
    setTravelData(prevData => ({ ...prevData, destination }));
    navigate('/ai-select');
  };

  const handleDestinationSelect = (suggestion) => {
    setDestination(suggestion.place_name);
    setTravelData(prevData => ({
      ...prevData,
      destination: suggestion.place_name,
      destinationImage: suggestion.image_url, // Assuming you get an image URL from the Mapbox API
    }));
    setAlertMessage('');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <Player
        autoplay
        loop
        src={travel}
        style={{ height: '300px', width: '300px' }}
      />
      <h1 className="text-4xl font-bold text-black-400 mt-6 mb-8 text-center">Plan Your Next Adventure with AI Travel Planner</h1>
      <div className="w-full max-w-md">
        <MapboxAutoSuggest onSelect={handleDestinationSelect} />
      </div>
      {alertMessage && (
        <div className="text-red-600 font-semibold mt-4 text-center">
          {alertMessage}
        </div>
      )}
      <button
        onClick={handlePlanTrip}
        className="bg-orange-400 text-white py-3 px-6 rounded-lg mt-8 text-lg font-semibold hover:bg-orange-500 transition duration-300"
      >
        Plan Trip
      </button>
      <p className="mt-6 text-gray-400 text-lg text-center">Your personal AI travel assistant</p>
    </div>
  );
};

export default AiTravelHome;
