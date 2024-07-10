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
      <div className="space-y-6 text-center">
        <h1 className="text-4xl font-bold text-orange-400">📋 Trip Summary 📝</h1>
        <div className="p-4 border border-orange-400 rounded-lg">
          <p>Destination: {tripData.destination || 'N/A'}</p>
          <p>
            Travelers: 
            {tripData.travelers.count > 0 
              ? `${tripData.travelers.type} - ${tripData.travelers.count} ${tripData.travelers.count === 1 ? 'person' : 'people'}` 
              : 'N/A'}
          </p>
          <p>
            Trip Dates: 
            {tripData.tripDates.startDate && tripData.tripDates.endDate 
              ? `${formatDate(tripData.tripDates.startDate)} - ${formatDate(tripData.tripDates.endDate)}` 
              : 'N/A'}
          </p>
          <p>Trip Type: {tripData.tripType || 'N/A'}</p>
          <p>Budget: {tripData.budget || 'N/A'}</p>
          <p>
            Accommodations: 
            {tripData.accommodation.name 
              ? `${tripData.accommodation.name}, ${tripData.accommodation.location} - ${tripData.accommodation.roomType}` 
              : 'N/A'}
          </p>
          <p>
            Dining: 
            {tripData.dining.meals.length > 0 
              ? `${tripData.dining.meals.join(', ')} (Dietary requirements: ${tripData.dining.dietaryRequirements || 'None'})` 
              : 'N/A'}
          </p>
        </div>
        <button 
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded"
          onClick={handleBuildItinerary}
        >
          🏁 Build My Itinerary
        </button>
      </div>
    </div>
  );
};

export default AiSummary;
