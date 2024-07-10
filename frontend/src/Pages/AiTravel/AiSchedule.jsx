// src/components/AiSchedule.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TripContext } from '../AiTravel/context/TripContext';

const AiSchedule = () => {
  const { tripData, setTripData } = useContext(TripContext);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!startDate || !endDate) {
      alert('Please select start and end dates for your trip.');
    } else {
      setTripData({ ...tripData, tripDates: { startDate, endDate } });
      navigate('/hotel');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-2xl p-6">
        <h1 className="text-4xl font-bold text-orange-400 mb-8 text-center">📅 Select Trip Dates 🗓️</h1>
        <div className="flex justify-center space-x-8 mb-8">
          <div className="flex flex-col items-center">
            <span className="text-lg mb-2">Start Date</span>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="border border-orange-400 p-2 rounded-lg text-center"
              wrapperClassName="w-full"
              calendarClassName="border border-orange-400"
            />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg mb-2">End Date</span>
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className="border border-orange-400 p-2 rounded-lg text-center"
              wrapperClassName="w-full"
              calendarClassName="border border-orange-400"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button onClick={handleContinue} className="bg-orange-400 text-white w-48 h-12 text-lg rounded-lg">
            👉 Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiSchedule;
