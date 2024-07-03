// src/components/AiBudget.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AiBudget = () => {
  const navigate = useNavigate();
  const [selectedPreference, setSelectedPreference] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');

  const handleContinue = () => {
    navigate('/ai-hotel');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Tailor your adventure to your tastes</h1>
      <p className="mb-4">Select your travel preferences to customize your trip plan.</p>
      <div className="flex flex-col mb-4">
        {[
          'Adventure Travel',
          'Cultural Exploration',
          'Beach Vacations',
          'Nature Escapes',
          'Road Trips',
          'Food Tourism',
          'Backpacking',
          'Wildlife Safaris',
          'Art Galleries',
          'Historical Sites',
          'Eco-Tourism',
        ].map((preference) => (
          <label key={preference}>
            <input
              type="radio"
              name="preference"
              value={preference}
              onChange={(e) => setSelectedPreference(e.target.value)}
            />
            {preference}
          </label>
        ))}
      </div>
      <h1 className="text-2xl font-bold mb-4">Set your trip budget</h1>
      <p className="mb-4">Let us know your budget preference, and we'll craft an itinerary that suits your financial comfort.</p>
      <div className="flex flex-col mb-4">
        {[
          { value: 'Cheap', description: 'Budget-friendly, economical travel.' },
          { value: 'Balanced', description: 'Moderate spending for a balanced trip.' },
          { value: 'Luxury', description: 'High-end, indulgent experiences.' },
          { value: 'Flexible', description: 'No budget restrictions.' },
        ].map((budget) => (
          <label key={budget.value}>
            <input
              type="radio"
              name="budget"
              value={budget.value}
              onChange={(e) => setSelectedBudget(e.target.value)}
            />
            {budget.value} - {budget.description}
          </label>
        ))}
      </div>
      <button
        onClick={handleContinue}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Continue
      </button>
    </div>
  );
};

export default AiBudget;
