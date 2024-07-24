import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TripContext } from "../AiTravel/context/TripContext";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from 'react-redux';
import { updateUserTrip } from '../../redux/user/UserSlice';


const AiSummary = () => {
  const { tripData: contextTripData } = React.useContext(TripContext);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const tripData = contextTripData || currentUser?.trip || {};
  const handleBuildItinerary = () => {
    const tripSummary = {
      destination: tripData.destination,
      travelers: tripData.travelers,
      tripDates: tripData.tripDates,
      tripType: tripData.tripType,
      budget: tripData.budget,
      accommodation: tripData.accommodation,
      dining: tripData.dining
    };

    dispatch(updateUserTrip(tripSummary));
    navigate("/travelplanner/finalize");
    console.log(tripData);
  };

 

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? "N/A" : date.toLocaleDateString();
  };

  const summaryItems = [
    { label: "Destination", value: tripData.destination, icon: "🌍" },
    {
      label: "Travelers",
      value:
        tripData.travelers?.count > 0
          ? `${tripData.travelers.type} - ${tripData.travelers.count} ${tripData.travelers.count === 1 ? "person" : "people"
          }`
          : "N/A",
      icon: "👥",
    },
    {
      label: "Trip Dates",
      value:
        tripData.tripDates?.startDate && tripData.tripDates?.endDate
          ? `${formatDate(tripData.tripDates.startDate)} - ${formatDate(
            tripData.tripDates.endDate
          )}`
          : "N/A",
      icon: "📅",
    },
    { label: "Trip Type", value: tripData.tripType, icon: "🏷️" },
    { label: "Budget", value: tripData.budget, icon: "💰" },
    {
      label: "Accommodations",
      value: tripData.accommodation?.name
        ? `${tripData.accommodation.name}, ${tripData.accommodation.location} - ${tripData.accommodation.roomType}`
        : "N/A",
      icon: "🏨",
    },
    {
      label: "Dining",
      value: tripData.dining?.name
        ? `${tripData.dining.name}, ${tripData.dining.location} - ${tripData.dining.cuisine} (${tripData.dining.mealTime})`
        : "N/A",
      icon: "🍽️",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-purple-200 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-4 sm:p-6 relative overflow-hidden flex flex-col"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-purple-500"></div>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center"
        >
          📋 Trip Summary 📝
        </motion.h1>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {tripData.destination && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="md:w-1/2 rounded-lg overflow-hidden shadow-md"
            >
              <img
                src={`https://source.unsplash.com/800x400/?${tripData.destination}`}
                alt={tripData.destination}
                className="w-full h-32 sm:h-48 object-cover"
              />
              <div className="p-2 sm:p-4 bg-gradient-to-r from-orange-400 to-purple-500 text-white">
                <h2 className="text-lg sm:text-xl font-semibold">
                  {tripData.destination}
                </h2>
                <p className="text-xs sm:text-sm opacity-80">
                  Your dream destination awaits!
                </p>
              </div>
            </motion.div>
          )}

          <div className="w-full md:w-1/2 space-y-2 sm:space-y-3 flex-grow overflow-y-auto pr-2 max-h-96">
            {summaryItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="flex items-center p-2 sm:p-3 bg-gray-100 rounded-lg"
              >
                <span className="text-lg sm:text-xl mr-2 sm:mr-3 flex-shrink-0">
                  {item.icon}
                </span>
                <div className="text-xs sm:text-sm">
                  <span className="font-semibold">{item.label}:</span>{" "}
                  {item.value || "N/A"}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex justify-center mt-4 sm:mt-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBuildItinerary}
            className="bg-gradient-to-r from-orange-400 to-purple-500 text-white px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-all"
          >
            🏁 Build My Itinerary →
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AiSummary;