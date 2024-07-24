import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TripContext } from '../AiTravel/context/TripContext';
import { useMediaQuery } from 'react-responsive';
import { motion } from 'framer-motion';

const AiSchedule = () => {
  const { tripData, updateTripData } = useContext(TripContext);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const handleContinue = () => {
    if (!startDate || !endDate) {
      alert('Please select start and end dates for your trip.');
    } else {
      updateTripData({ ...tripData, tripDates: { startDate, endDate } });
      navigate('/travelplanner/hotel');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-xl w-full max-w-2xl p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Plan Your Perfect Dates 🗓️✨
        </h1>
        <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} justify-center space-y-8 md:space-y-0 md:space-x-8 mb-8`}>
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
                className="border-2 border-purple-300 rounded-lg shadow-md"
                calendarClassName="bg-white rounded-lg shadow-lg"
              />
            </div>
          ) : (
            <>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center"
              >
                <span className="text-lg mb-2 font-semibold text-purple-600">Start Date</span>
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  inline
                  className="border-2 border-purple-300 rounded-lg shadow-md"
                  calendarClassName="bg-white rounded-lg shadow-lg"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center"
              >
                <span className="text-lg mb-2 font-semibold text-purple-600">End Date</span>
                <DatePicker
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  inline
                  className="border-2 border-purple-300 rounded-lg shadow-md"
                  calendarClassName="bg-white rounded-lg shadow-lg"
                />
              </motion.div>
            </>
          )}
        </div>
        <div className="flex justify-center mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleContinue}
            className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Let's Go! 🚀
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default AiSchedule;