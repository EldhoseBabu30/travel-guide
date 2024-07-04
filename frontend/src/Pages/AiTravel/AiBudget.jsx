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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Tailor your adventure to your tastes</h1>
        <p className="mb-6 text-center">Select your travel preferences to customize your trip plan.</p>
        <div className="flex flex-col mb-8">
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
          ].map((preference, index) => (
            <label key={index} className="p-4 mb-2 rounded-lg border-2 transition-all duration-300 ease-in-out border-gray-300 hover:bg-orange-100 hover:border-orange-400 cursor-pointer">
              <input
                type="radio"
                name="preference"
                value={preference}
                onChange={(e) => setSelectedPreference(e.target.value)}
                className="hidden"
              />
              <span className="text-lg font-semibold">{preference}</span>
            </label>
          ))}
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center">Set your trip budget</h1>
        <p className="mb-6 text-center">Let us know your budget preference, and we'll craft an itinerary that suits your financial comfort.</p>
        <div className="flex flex-col mb-8">
          {[
            { value: 'Cheap', description: 'Budget-friendly, economical travel.' },
            { value: 'Balanced', description: 'Moderate spending for a balanced trip.' },
            { value: 'Luxury', description: 'High-end, indulgent experiences.' },
            { value: 'Flexible', description: 'No budget restrictions.' },
          ].map((budget, index) => (
            <label
              key={index}
              className={`p-4 mb-4 rounded-lg border-2 transition-all duration-300 ease-in-out ${
                selectedBudget === budget.value ? 'border-orange-400 bg-orange-100' : 'border-gray-300'
              } hover:bg-orange-100 hover:border-orange-400 cursor-pointer flex flex-col`}
            >
              <input
                type="radio"
                name="budget"
                value={budget.value}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="hidden"
              />
              <span className="text-lg font-semibold">{budget.value}</span>
              <span className="text-sm text-gray-600">{budget.description}</span>
            </label>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            className="bg-orange-400 text-white py-2 px-8 rounded-full font-semibold shadow-lg hover:bg-orange-500 transition-all duration-300"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiBudget;
