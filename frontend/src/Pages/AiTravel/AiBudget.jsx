import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AiBudget = () => {
  const navigate = useNavigate();
  const [selectedPreference, setSelectedPreference] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');

  const handleContinue = () => {
    navigate('/ai-hotel');
  };

  const preferences = [
    { value: 'Adventure Travel', emoji: '🏔️' },
    { value: 'Cultural Exploration', emoji: '🏛️' },
    { value: 'Beach Vacations', emoji: '🏖️' },
    { value: 'Nature Escapes', emoji: '🌲' },
    { value: 'Road Trips', emoji: '🚗' },
    { value: 'Food Tourism', emoji: '🍽️' },
    { value: 'Backpacking', emoji: '🎒' },
    { value: 'Wildlife Safaris', emoji: '🦁' },
    { value: 'Art Galleries', emoji: '🖼️' },
    { value: 'Historical Sites', emoji: '🏰' },
    { value: 'Eco-Tourism', emoji: '🌍' },
  ];

  const budgets = [
    { value: 'Cheap', description: 'Budget-friendly, economical travel.', emoji: '💸' },
    { value: 'Balanced', description: 'Moderate spending for a balanced trip.', emoji: '💵' },
    { value: 'Luxury', description: 'High-end, indulgent experiences.', emoji: '💎' },
    { value: 'Flexible', description: 'No budget restrictions.', emoji: '🪙' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Tailor your adventure to your tastes</h1>
        <p className="mb-6 text-center">Select your travel preferences to customize your trip plan.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8" style={{ width: '90%', margin: '0 auto' }}>
          {preferences.map((preference, index) => (
            <label
              key={index}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ease-in-out ${
                selectedPreference === preference.value ? 'border-orange-400 bg-orange-100' : 'border-gray-300'
              } hover:bg-orange-100 hover:border-orange-400 cursor-pointer flex items-center justify-center text-center`}
              style={{ height: '80px' }}
            >
              <input
                type="radio"
                name="preference"
                value={preference.value}
                onChange={(e) => setSelectedPreference(e.target.value)}
                className="hidden"
              />
              <span className="text-lg font-semibold">
                {preference.emoji} {preference.value}
              </span>
            </label>
          ))}
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center">Set your trip budget</h1>
        <p className="mb-6 text-center">Let us know your budget preference, and we'll craft an itinerary that suits your financial comfort.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8" style={{ width: '90%', margin: '0 auto' }}>
          {budgets.map((budget, index) => (
            <label
              key={index}
              className={`p-4 rounded-lg border-2 transition-all duration-300 ease-in-out ${
                selectedBudget === budget.value ? 'border-orange-400 bg-orange-100' : 'border-gray-300'
              } hover:bg-orange-100 hover:border-orange-400 cursor-pointer flex flex-col items-center justify-center text-center`}
              style={{ height: '80px' }}
            >
              <input
                type="radio"
                name="budget"
                value={budget.value}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="hidden"
              />
              <span className="text-lg font-semibold">{budget.emoji} {budget.value}</span>
              <span className="text-sm text-gray-600">{budget.description}</span>
            </label>
          ))}
        </div>
        <div className="flex py-6 justify-center">
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
