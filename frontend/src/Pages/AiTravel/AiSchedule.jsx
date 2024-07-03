// src/components/AiSchedule.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AiSchedule = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleContinue = () => {
    navigate('/ai-budget');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">When will your adventure begin and end?</h1>
      <p className="mb-4">Choose the dates for your trip. This helps us plan the perfect itinerary for your travel period.</p>
      <div className="mb-4">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          className="border p-2"
        />
      </div>
      <div className="mb-4">
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          className="border p-2"
        />
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

export default AiSchedule;
