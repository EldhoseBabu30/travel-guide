import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AiSelect = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');

  const handleScheduleTrip = () => {
    navigate('/ai-schedule');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white p-4 lg:p-8">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Who is going? 🧳</h1>
        <p className="text-center mb-8 text-gray-700">Let's get started by selecting who you're traveling with.</p>
        <div className="flex flex-col w-full">
          {[
            { label: 'Only Me 🧍', description: 'Traveling solo, just you.' },
            { label: 'A Couple ❤️', description: 'A romantic getaway for two.' },
            { label: 'Family 👨‍👩‍👧‍👦', description: 'Quality time with your loved ones.' },
            { label: 'Friends 🌟', description: 'Adventure with your closest pals.' },
            { label: 'Work 🧳', description: 'Business or corporate travel.' },
          ].map((option, index) => (
            <label
              key={index}
              className={`p-4 mb-4 rounded-lg border-2 transition-all duration-300 ease-in-out ${
                selectedOption === option.label ? 'border-orange-400 bg-orange-100' : 'border-gray-300'
              } hover:bg-orange-100 hover:border-orange-400 cursor-pointer flex flex-col`}
            >
              <input
                type="radio"
                name="travelOption"
                value={option.label}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="hidden"
              />
              <span className="text-lg font-semibold">{option.label}</span>
              <span className="text-sm text-gray-600">{option.description}</span>
            </label>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={handleScheduleTrip}
            className="bg-orange-400 text-white py-2 px-8 rounded-full font-semibold shadow-lg hover:bg-orange-500 transition-all duration-300"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiSelect;
