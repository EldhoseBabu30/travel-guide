// src/components/AiSummary.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TripContext } from '../AiTravel/context/TripContext';

const AiSummary = () => {
  const { tripData } = useContext(TripContext);
  const navigate = useNavigate();

  const handleBuildItinerary = () => {
    navigate('/finalize');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? 'N/A' : date.toLocaleDateString();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-2xl p-6 space-y-6 text-center">
        <h1 className="text-4xl font-bold text-orange-400">📋 Trip Summary 📝</h1>
        <div className="p-6 border border-orange-400 rounded-lg space-y-4">
          <p className="text-lg">
            <span className="font-semibold">Destination:</span> {tripData.destination || 'N/A'}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Travelers:</span> {tripData.travelers.count > 0 
              ? `${tripData.travelers.type} - ${tripData.travelers.count} ${tripData.travelers.count === 1 ? 'person' : 'people'}` 
              : 'N/A'}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Trip Dates:</span> {tripData.tripDates.startDate && tripData.tripDates.endDate 
              ? `${formatDate(tripData.tripDates.startDate)} - ${formatDate(tripData.tripDates.endDate)}` 
              : 'N/A'}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Trip Type:</span> {tripData.tripType || 'N/A'}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Budget:</span> {tripData.budget || 'N/A'}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Accommodations:</span> {tripData.accommodation.name 
              ? `${tripData.accommodation.name}, ${tripData.accommodation.location} - ${tripData.accommodation.roomType}` 
              : 'N/A'}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Dining:</span> {tripData.dining.meals.length > 0 
              ? `${tripData.dining.meals.join(', ')} (Dietary requirements: ${tripData.dining.dietaryRequirements || 'None'})` 
              : 'N/A'}
          </p>
        </div>
        <button 
          className="mt-4 px-4 py-2 bg-orange-400 text-white text-lg rounded-lg hover:bg-orange-500"
          onClick={handleBuildItinerary}
        >
          🏁 Build My Itinerary
        </button>
      </div>
    </div>
  );
};

export default AiSummary;
