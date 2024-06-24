import React from 'react';
import { useLocation } from 'react-router-dom';

const Plan = () => {
  const location = useLocation();
  const { travelPlan } = location.state || {};

  if (!travelPlan) {
    return <div>No travel plan available. Please go back and submit the form.</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center mt-12">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">Your Travel Plan</h1>
        <div className="text-left">
          <h2 className="text-2xl font-semibold mb-4">Destination: {travelPlan.destination}</h2>
          <p className="mb-2"><strong>Dates:</strong> {travelPlan.dates}</p>
          <p className="mb-2"><strong>Activities:</strong> {travelPlan.activities.join(', ')}</p>
          <p className="mb-2"><strong>Number of People:</strong> {travelPlan.people}</p>
          <p className="mb-2"><strong>Traveling With:</strong> {travelPlan.travelWith}</p>
          {/* Add more details from travelPlan as necessary */}
        </div>
      </div>
    </div>
  );
};

export default Plan;
