// src/pages/AiFinalize.jsx
import React from 'react';
import { useTravelContext } from '../../Pages/AiTravel/AiContext/AiContext';
import { useNavigate } from 'react-router-dom';

const AiFinalize = () => {
  const navigate = useNavigate();
  const { travelData } = useTravelContext();

  const handleStartNewTrip = () => {
    navigate('/ai-itinerary');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white p-4 lg:p-8">
      <div className="w-full max-w-lg text-center">
        <h1 className="text-4xl font-bold mb-8 text-orange-500">Finalize Your Trip</h1>
        <div className="p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Trip Summary</h2>
          <p className="text-lg font-medium mb-2">
            <strong>Destination:</strong> {travelData.destination}
          </p>
          <p className="text-lg font-medium mb-2">
            <strong>Number of Travelers:</strong> {travelData.travelers}
          </p>
          <p className="text-lg font-medium mb-2">
            <strong>Start Date:</strong> {travelData.startDate}
          </p>
          <p className="text-lg font-medium mb-2">
            <strong>End Date:</strong> {travelData.endDate}
          </p>
          <p className="text-lg font-medium mb-2">
            <strong>Preferences:</strong> {travelData.preferences.join(', ')}
          </p>
          <p className="text-lg font-medium mb-2">
            <strong>Budget:</strong> {travelData.budget}
          </p>
          {travelData.destinationImage && (
            <img
              src={travelData.destinationImage}
              alt={travelData.destination}
              className="mt-4 rounded-lg shadow-md"
              style={{ maxHeight: '300px', maxWidth: '100%' }}
            />
          )}
        </div>
        <button
          onClick={handleStartNewTrip}
          className="bg-orange-400 text-white py-2 px-8 rounded-full font-semibold shadow-lg hover:bg-orange-500 transition duration-300 mt-6"
        >
          Create Itinerary
        </button>
      </div>
    </div>
  );
};

export default AiFinalize;
