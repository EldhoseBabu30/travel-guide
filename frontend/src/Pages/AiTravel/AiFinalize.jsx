// src/pages/AiFinalize.jsx
import React from 'react';
import { useTravelContext } from '../AiTravel/AiContext/AiContext';

const AiFinalize = () => {
  const { travelData } = useTravelContext();

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 bg-white">
      <h1 className="text-4xl font-bold mb-4">Your Trip Summary</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Destination</h2>
        <p className="text-lg mb-4">{travelData.destination}</p>
        {travelData.destinationImage && (
          <img src={travelData.destinationImage} alt="Destination" className="w-full h-48 object-cover mb-4 rounded-lg" />
        )}
        <h2 className="text-2xl font-bold mb-4">Travelers</h2>
        <p className="text-lg mb-4">{travelData.travelers}</p>
        <h2 className="text-2xl font-bold mb-4">Trip Dates</h2>
        <p className="text-lg mb-4">{travelData.startDate}{travelData.endDate}</p>
        <h2 className="text-2xl font-bold mb-4">Interests</h2>
        <p className="text-lg mb-4">{travelData.preferences}</p>
        <h2 className="text-2xl font-bold mb-4">Budget</h2>
        <p className="text-lg mb-4">{travelData.budget}</p>
      </div>
      <button className="bg-orange-400 text-white py-3 px-6 rounded-lg mt-8 text-lg font-semibold hover:bg-orange-500 transition duration-300">
        Build My Itinerary
      </button>
    </div>
  );
};

export default AiFinalize;
