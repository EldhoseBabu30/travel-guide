// src/components/AiSelect.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TripContext } from '../AiTravel/context/TripContext';

const AiSelect = () => {
  const { tripData, setTripData } = useContext(TripContext);
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [budget, setBudget] = useState('');
  const navigate = useNavigate();

  const travelPreferences = [
    { name: 'Adventure Travel', emoji: '🌄' },
    { name: 'Cultural Exploration', emoji: '🗿' },
    { name: 'Beach Vacations', emoji: '🏖️' },
    { name: 'Nature Escapes', emoji: '🌲' },
    { name: 'Road Trips', emoji: '🚗' },
    { name: 'Food Tourism', emoji: '🍲' },
    { name: 'Backpacking', emoji: '🎒' },
    { name: 'Wildlife Safaris', emoji: '🦁' },
    { name: 'Art Galleries', emoji: '🖼️' },
    { name: 'Historical Sites', emoji: '🏰' },
    { name: 'Eco-Tourism', emoji: '♻️' }
  ];

  const budgetOptions = [
    { name: 'Cheap', emoji: '💸' },
    { name: 'Balanced', emoji: '⚖️' },
    { name: 'Luxury', emoji: '💎' },
    { name: 'Flexible', emoji: '🔄' }
  ];

  const handlePreferenceToggle = (preference) => {
    setSelectedPreferences(prev =>
      prev.includes(preference)
        ? prev.filter(p => p !== preference)
        : [...prev, preference]
    );
  };

  const handleContinue = () => {
    if (selectedPreferences.length === 0 || !budget) {
      alert('Please select at least one travel preference and a budget.');
    } else {
      setTripData({
        ...tripData,
        tripType: selectedPreferences.join(', '),
        budget
      });
      navigate('/schedule');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-4xl p-6">
        <h1 className="text-4xl font-bold text-orange-400 mb-8 text-center">🏖️ Select Trip Preferences and Budget 💸</h1>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Select Travel Preferences</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {travelPreferences.map(preference => (
              <button
                key={preference.name}
                className={`flex items-center justify-center w-40 h-16 p-4 text-lg rounded-lg border-2 transition-colors duration-300 ${
                  selectedPreferences.includes(preference.name)
                    ? 'bg-orange-400 text-white border-orange-400'
                    : 'bg-white text-black border-orange-400 hover:bg-orange-400 hover:text-white'
                }`}
                onClick={() => handlePreferenceToggle(preference.name)}
              >
                <span className="mr-2">{preference.emoji}</span>
                {preference.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Select Budget</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {budgetOptions.map(option => (
              <button
                key={option.name}
                className={`flex items-center justify-center w-40 h-16 p-4 text-lg rounded-lg border-2 transition-colors duration-300 ${
                  budget === option.name
                    ? 'bg-orange-400 text-white border-orange-400'
                    : 'bg-white text-black border-orange-400 hover:bg-orange-400 hover:text-white'
                }`}
                onClick={() => setBudget(option.name)}
              >
                <span className="mr-2">{option.emoji}</span>
                {option.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button onClick={handleContinue} className="bg-orange-400 text-white w-48 h-12 text-lg rounded-lg">
            👉 Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiSelect;
