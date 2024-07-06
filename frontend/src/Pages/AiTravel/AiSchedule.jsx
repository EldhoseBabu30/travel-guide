// src/pages/AiSchedule.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTravelContext } from '../AiTravel/AiContext/AiContext';

const AiSchedule = () => {
  const navigate = useNavigate();
  const { setTravelData } = useTravelContext();
  const [dateRange, setDateRange] = useState([null, null]);
  const [alertMessage, setAlertMessage] = useState('');
  const [startDate, endDate] = dateRange;

  const handleContinue = () => {
    if (!startDate || !endDate) {
      setAlertMessage('Please select both start and end dates before continuing.');
      return;
    }
    setAlertMessage('');
    setTravelData(prevData => ({
      ...prevData,
      startDate: startDate.toDateString(),
      endDate: endDate.toDateString(),
    }));
    navigate('/ai-budget');
  };

  const handleReset = () => {
    setDateRange([null, null]);
    setAlertMessage('');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white p-4 lg:p-8">
      <h1 className="text-3xl font-bold mb-4 text-center">When will your adventure begin and end? 📅</h1>
      <p className="text-center mb-8 text-gray-700">Choose the dates for your trip. This helps us plan the perfect itinerary for your travel period.</p>
      <h2 className="text-lg font-semibold mb-2">Select dates</h2>
      <div className="flex flex-col space-y-8 mb-8">
        <div className="w-full max-w-md">
          <DatePicker
            selected={startDate}
            onChange={(update) => setDateRange(update)}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            className="w-full text-center border rounded-lg"
            calendarClassName="bg-white p-4 shadow rounded-lg"
            dayClassName={(date) => {
              const isInRange = startDate && endDate && date > startDate && date < endDate;
              const isSelected = date >= startDate && date <= endDate;
              return (
                "text-gray-700 hover:bg-gray-200 rounded-md transition-colors duration-200 ease-in-out" +
                (isSelected ? " bg-orange-400 text-white" : "") +
                (isInRange ? " bg-orange-400 opacity-50" : "")
              );
            }}
            renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
              <div className="flex justify-between items-center">
                <button onClick={decreaseMonth} className="focus:outline-none">
                  {'<'}
                </button>
                <span className="text-lg font-semibold">
                  {date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}
                </span>
                <button onClick={increaseMonth} className="focus:outline-none">
                  {'>'}
                </button>
              </div>
            )}
          />
        </div>
      </div>
      <div className="mb-8 text-center">
        <h2 className="text-lg font-semibold mb-2">Selected Dates:</h2>
        <p className="text-gray-700 mb-1">
          {`Start Date: ${startDate ? startDate.toDateString() : 'Not selected'}`}
        </p>
        <p className="text-gray-700">
          {`End Date: ${endDate ? endDate.toDateString() : 'Not selected'}`}
        </p>
      </div>
      {alertMessage && (
        <div className="mb-4 text-center text-red-600 font-semibold">
          {alertMessage}
        </div>
      )}
      <div className="flex space-x-4">
        <button
          onClick={handleReset}
          className="bg-gray-400 text-white py-2 px-8 rounded-full font-semibold shadow-lg hover:bg-gray-500 transition-all duration-300"
        >
          Reset
        </button>
        <button
          onClick={handleContinue}
          className="bg-orange-400 text-white py-2 px-8 rounded-full font-semibold shadow-lg hover:bg-orange-500 transition-all duration-300"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default AiSchedule;
