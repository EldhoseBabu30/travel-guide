import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TripContext } from '../AiTravel/context/TripContext';
import { useMediaQuery } from 'react-responsive';

const AiSchedule = () => {
  const { tripData, setTripData } = useContext(TripContext);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

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
          {isMobile ? (
            <div className="flex flex-col items-center">
              <DatePicker
                selected={startDate}
                onChange={dates => {
                  const [start, end] = dates;
                  setStartDate(start);
                  setEndDate(end);
                }}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                className="border border-orange-400 p-2 rounded-lg"
                calendarClassName="border border-orange-400"
              />
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center">
                <span className="text-lg mb-2">Start Date</span>
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  inline
                  className="border border-orange-400 p-2 rounded-lg"
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
                  inline
                  className="border border-orange-400 p-2 rounded-lg"
                  calendarClassName="border border-orange-400"
                />
              </div>
            </>
          )}
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
