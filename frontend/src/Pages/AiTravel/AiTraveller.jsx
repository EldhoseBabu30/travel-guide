import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TripContext } from '../AiTravel/context/TripContext';
import { motion } from 'framer-motion';

const AiTraveller = () => {
  const { tripData, updateTripData } = useContext(TripContext);
  const [travelerType, setTravelerType] = useState('');
  const [peopleCount, setPeopleCount] = useState(0);
  const navigate = useNavigate();

  const handleIncrement = () => setPeopleCount(peopleCount + 1);
  const handleDecrement = () => setPeopleCount(Math.max(0, peopleCount - 1));

  const handleContinue = () => {
    if ((travelerType === 'Family' || travelerType === 'Friends' || travelerType === 'Work') && peopleCount === 0) {
      alert('Please select the number of people traveling.');
    } else if (travelerType === 'Only Me') {
      updateTripData({
        ...tripData,
        travelers: { type: travelerType, count: 1 },
      });
      navigate('/select');
    } else {
      updateTripData({
        ...tripData,
        travelers: { type: travelerType, count: travelerType === 'A Couple' ? 2 : peopleCount },
      });
      navigate('/select');
    }
  };

  const travelerOptions = [
    { type: 'Only Me', emoji: '👤', description: 'Solo adventure awaits!' },
    { type: 'A Couple', emoji: '❤️', description: 'Romantic getaway for two' },
    { type: 'Family', emoji: '👨‍👩‍👧‍👦', description: 'Create lasting memories together' },
    { type: 'Friends', emoji: '👯‍♂️', description: 'Fun times with your squad' },
    { type: 'Work', emoji: '💼', description: 'Business trip or team building' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-purple-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-purple-500"></div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-800 mb-6 text-center"
        >
          Who's Going? 🌍✈️
        </motion.h1>
        <div className="space-y-3">
          {travelerOptions.map(({ type, emoji, description }) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full p-3 rounded-lg transition-all duration-300 text-left ${
                travelerType === type
                  ? 'bg-gradient-to-r from-orange-400 to-purple-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => {
                setTravelerType(type);
                if (type === 'Only Me') {
                  setPeopleCount(1);
                } else if (type === 'A Couple') {
                  setPeopleCount(2);
                } else {
                  setPeopleCount(0);
                }
              }}
            >
              <div className="flex items-center">
                <span className="text-xl mr-3">{emoji}</span>
                <div>
                  <span className="font-semibold">{type}</span>
                  <p className="text-xs mt-1 opacity-80">{description}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {(travelerType === 'Family' || travelerType === 'Friends' || travelerType === 'Work') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center mt-6 space-x-4"
          >
            <button onClick={handleDecrement} className="bg-gray-200 text-gray-800 w-8 h-8 rounded-full shadow-md hover:bg-gray-300 transition-colors">
              -
            </button>
            <span className="text-lg font-semibold">{peopleCount} {peopleCount === 1 ? 'person' : 'people'}</span>
            <button onClick={handleIncrement} className="bg-gray-200 text-gray-800 w-8 h-8 rounded-full shadow-md hover:bg-gray-300 transition-colors">
              +
            </button>
          </motion.div>
        )}

        <div className="flex justify-center mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleContinue}
            className="bg-gradient-to-r from-orange-400 to-purple-500 text-white px-6 py-2 rounded-full text-base font-semibold shadow-md hover:shadow-lg transition-all"
          >
            Continue →
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AiTraveller;