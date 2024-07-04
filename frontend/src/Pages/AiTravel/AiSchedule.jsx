import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AiSchedule = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    // Ensure the left calendar shows the current month and the right calendar shows the next month
    const currentMonth = new Date();
    setLeftMonth(currentMonth);
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(currentMonth.getMonth() + 1);
    setRightMonth(nextMonth);
  }, []);

  const [leftMonth, setLeftMonth] = useState(new Date());
  const [rightMonth, setRightMonth] = useState(new Date());

  const handleContinue = () => {
    navigate('/ai-budget');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white p-4 lg:p-8">
      <h1 className="text-3xl font-bold mb-4 text-center">When will your adventure begin and end? 📅</h1>
      <p className="text-center mb-8 text-gray-700">Choose the dates for your trip. This helps us plan the perfect itinerary for your travel period.</p>
      <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8 mb-8">
        <div className="w-full max-w-md">
          <h2 className="text-lg font-semibold mb-2">Start Date</h2>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            inline
            className="w-full text-center border rounded-lg"
            calendarClassName="bg-white p-4 shadow rounded-lg"
            dayClassName={(date) => {
              const dateClass = date >= startDate && date <= endDate
                ? date === startDate || date === endDate
                  ? "bg-orange-400 text-white"
                  : "bg-orange-400 bg-opacity-50 text-white"
                : "text-gray-700 hover:bg-gray-200 rounded-md transition-colors duration-200 ease-in-out";
              return dateClass;
            }}
            monthClassName="text-gray-700 font-semibold"
            renderCustomHeader={({ monthDate }) => {
              setLeftMonth(monthDate);
              return null;
            }}
          />
        </div>
        <div className="w-full max-w-md">
          <h2 className="text-lg font-semibold mb-2">End Date</h2>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            inline
            className="w-full text-center border rounded-lg"
            calendarClassName="bg-white p-4 shadow rounded-lg"
            dayClassName={(date) => {
              const dateClass = date >= startDate && date <= endDate
                ? date === startDate || date === endDate
                  ? "bg-orange-400 text-white"
                  : "bg-orange-400 bg-opacity-50 text-white"
                : "text-gray-700 hover:bg-gray-200 rounded-md transition-colors duration-200 ease-in-out";
              return dateClass;
            }}
            monthClassName="text-gray-700 font-semibold"
            renderCustomHeader={({ monthDate }) => {
              setRightMonth(monthDate);
              return null;
            }}
          />
        </div>
      </div>
      <div className="mb-8 text-center">
        <h2 className="text-lg font-semibold mb-2">Selected Dates:</h2>
        <p className="text-gray-700 mb-1">
          {startDate ? `Start Date: ${startDate.toDateString()}` : 'Start Date: Not selected'}
        </p>
        <p className="text-gray-700">
          {endDate ? `End Date: ${endDate.toDateString()}` : 'End Date: Not selected'}
        </p>
      </div>
      <button
        onClick={handleContinue}
        className="bg-orange-400 text-white py-2 px-8 rounded-full font-semibold shadow-lg hover:bg-orange-500 transition-all duration-300"
      >
        Continue
      </button>
    </div>
  );
};

export default AiSchedule;
