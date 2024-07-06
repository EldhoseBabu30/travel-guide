// src/pages/AiSelect.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravelContext } from '../../Pages/AiTravel/AiContext/AiContext';

const AiSelect = () => {
  const navigate = useNavigate();
  const { setTravelData } = useTravelContext();
  const [selectedOption, setSelectedOption] = useState('');
  const [numPersons, setNumPersons] = useState(1);
  const [showAlert, setShowAlert] = useState(false);

  const handleScheduleTrip = () => {
    if (
      (selectedOption === 'Work 🧳' || selectedOption === 'Family 👨‍👩‍👧‍👦' || selectedOption === 'Friends 🌟') &&
      numPersons <= 0
    ) {
      setShowAlert(true);
      return;
    }

    if (!selectedOption) {
      setShowAlert(true);
      return;
    }

    setTravelData(prevData => ({
      ...prevData,
      travelers: `${selectedOption} (${numPersons} ${numPersons > 1 ? 'People' : 'Person'})`,
    }));

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
              onClick={() => {
                setSelectedOption(option.label);
                if (option.label === 'Only Me 🧍' || option.label === 'A Couple ❤️') {
                  setNumPersons(1);
                }
              }}
            >
              <input
                type="radio"
                name="travelOption"
                value={option.label}
                checked={selectedOption === option.label}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="hidden"
              />
              <span className="text-lg font-semibold">{option.label}</span>
              <span className="text-sm text-gray-600">{option.description}</span>
            </label>
          ))}
        </div>
        {(selectedOption === 'Family 👨‍👩‍👧‍👦' || selectedOption === 'Friends 🌟' || selectedOption === 'Work 🧳') && (
          <div className="flex flex-col items-center justify-center mt-4">
            <label className="text-lg font-semibold mb-2">How many people are going?</label>
            <div className="flex items-center border rounded-lg px-4 py-2 w-full max-w-lg">
              <div className="flex items-center mr-4">
                <div className="bg-orange-400 text-white px-4 py-2 rounded-lg text-lg font-semibold mr-2">
                  {numPersons}
                </div>
                <span>{numPersons > 1 ? 'People' : 'Person'} {numPersons > 1 ? '👨‍👩‍👧‍👦' : '🧍'}</span>
              </div>
              <div className="flex items-center ml-auto">
                <button
                  onClick={() => setNumPersons((prev) => Math.max(prev - 1, 1))}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg mr-2"
                >
                  -
                </button>
                <button
                  onClick={() => setNumPersons((prev) => prev + 1)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
        {showAlert && (
          <div className="text-red-500 text-center mt-4">
            Please select an option and ensure the number of persons is correct.
          </div>
        )}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleScheduleTrip}
            className="bg-orange-400 text-white py-2 px-8 rounded-full font-semibold shadow-lg hover:bg-orange-500 transition duration-300"
          >
            Schedule Trip
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiSelect;
