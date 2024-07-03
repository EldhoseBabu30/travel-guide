// src/components/AiSelect.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AiSelect = () => {
  const navigate = useNavigate();
  const [travelers, setTravelers] = useState(1);
  const [selectedOption, setSelectedOption] = useState('');

  const handleScheduleTrip = () => {
    navigate('/ai-schedule');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Who is going?</h1>
      <p className="mb-4">Let's get started by selecting who you're traveling with.</p>
      <div className="flex flex-col mb-4">
        <label>
          <input
            type="radio"
            name="travelOption"
            value="Only Me"
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          Only Me - Traveling solo, just you.
        </label>
        <label>
          <input
            type="radio"
            name="travelOption"
            value="A Couple"
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          A Couple - A romantic getaway for two.
        </label>
        <label>
          <input
            type="radio"
            name="travelOption"
            value="Family"
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          Family - Quality time with your loved ones.
        </label>
        <label>
          <input
            type="radio"
            name="travelOption"
            value="Friends"
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          Friends - Adventure with your closest pals.
        </label>
        <label>
          <input
            type="radio"
            name="travelOption"
            value="Work"
            onChange={(e) => setSelectedOption(e.target.value)}
          />
          Work - Business or corporate travel.
        </label>
      </div>
      <div className="flex items-center mb-4">
        <button onClick={() => setTravelers(Math.max(travelers - 1, 1))}>-</button>
        <span className="mx-2">{travelers}</span>
        <button onClick={() => setTravelers(travelers + 1)}>+</button>
      </div>
      <button
        onClick={handleScheduleTrip}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Schedule the Trip
      </button>
    </div>
  );
};

export default AiSelect;
