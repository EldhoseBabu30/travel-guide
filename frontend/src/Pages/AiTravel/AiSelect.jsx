import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TripContext } from '../AiTravel/context/TripContext';
import { motion } from 'framer-motion';

const AiSelect = () => {
  const { tripData, updateTripData } = useContext(TripContext);
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
      updateTripData({
        tripType: selectedPreferences.join(', '),
        budget
      });
      navigate('/travelplanner/schedule');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-100 to-green-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-xl w-full max-w-4xl p-4 sm:p-8 relative overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 via-yellow-400 to-green-400"></div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
          Craft Your Perfect Journey 🌍✨
        </h1>

        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3 sm:mb-4 text-center">Travel Preferences</h2>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {travelPreferences.map(preference => (
              <motion.button
                key={preference.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center justify-center w-28 sm:w-36 h-12 sm:h-14 p-2 text-xs sm:text-sm rounded-full transition-all duration-300 ${
                  selectedPreferences.includes(preference.name)
                    ? 'bg-gradient-to-r from-orange-400 to-yellow-400 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => handlePreferenceToggle(preference.name)}
              >
                <span className="mr-1 sm:mr-2 text-base sm:text-lg">{preference.emoji}</span>
                {preference.name}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3 sm:mb-4 text-center">Budget</h2>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {budgetOptions.map(option => (
              <motion.button
                key={option.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center justify-center w-28 sm:w-32 h-12 sm:h-14 p-2 text-base sm:text-lg rounded-full transition-all duration-300 ${
                  budget === option.name
                    ? 'bg-gradient-to-r from-green-400 to-blue-400 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setBudget(option.name)}
              >
                <span className="mr-1 sm:mr-2">{option.emoji}</span>
                {option.name}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6 sm:mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleContinue}
            className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Let's Go! 🚀
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default AiSelect;