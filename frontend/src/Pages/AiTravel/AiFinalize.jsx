// src/components/AiFinalize.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaUserFriends, FaCalendarAlt, FaStar, FaMoneyBillWave } from 'react-icons/fa';

const AiFinalize = ({
  destination = 'Unknown Destination',
  destinationImage = 'default-image.jpg',
  travelers = 'Unknown Travelers',
  tripDates = 'Unknown Dates',
  interests = [],
  budget = 'Unknown Budget'
}) => {
  const navigate = useNavigate();

  const handleBuildItinerary = () => {
    navigate('/build-itinerary');
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-4">
      <header className="bg-white text-black p-4 w-full text-center shadow-md">
        <h1 className="text-2xl font-bold">Review Summary</h1>
      </header>
      <div className="bg-white shadow-md rounded p-6 mt-6 w-full max-w-4xl">
        <section className="mb-6">
          <h2 className="text-lg font-semibold flex items-center">
            <FaMapMarkerAlt className="mr-2" /> Destination
          </h2>
          <div className="flex items-center mt-2">
            <img src={destinationImage} alt="Destination" className="w-16 h-16 rounded mr-4" />
            <div>
              <p className="font-bold">{destination}</p>
              <p>Japan</p>
            </div>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold flex items-center">
            <FaUserFriends className="mr-2" /> Party
          </h2>
          <p className="mt-2">{travelers}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold flex items-center">
            <FaCalendarAlt className="mr-2" /> Trip Dates
          </h2>
          <p className="mt-2">{tripDates}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold flex items-center">
            <FaStar className="mr-2" /> 5 Interests
          </h2>
          <div className="flex flex-wrap mt-2">
            {interests.length > 0 ? (
              interests.map((interest, index) => (
                <span
                  key={index}
                  className="bg-gray-200 rounded-full px-4 py-2 m-1 text-sm"
                >
                  {interest}
                </span>
              ))
            ) : (
              <p>No interests selected</p>
            )}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold flex items-center">
            <FaMoneyBillWave className="mr-2" /> Budget
          </h2>
          <p className="mt-2">{budget}</p>
        </section>

        <button
          onClick={handleBuildItinerary}
          className="bg-green-500 text-white py-2 px-4 rounded mt-4 w-full"
        >
          Build My Itinerary
        </button>
      </div>
    </div>
  );
};

export default AiFinalize;
