// src/components/AiItinerary.jsx
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AiItinerary = () => {
  const [itinerary, setItinerary] = useState(null);

  useEffect(() => {
    toast.info('Generating itinerary...');

    // Simulate API call to generate itinerary
    setTimeout(() => {
      setItinerary({
        destination: 'New York',
        travelers: 2,
        travelPreference: 'Adventure Travel',
        budget: 'Balanced',
        hotel: '4 star hotel',
        food: 'Italian',
        schedule: [
          { day: 1, activity: 'Central Park visit' },
          { day: 2, activity: 'Museum of Modern Art' },
        ],
      });
      toast.dismiss();
      toast.success('Itinerary generated successfully!');
    }, 3000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Your Itinerary</h1>
      {itinerary ? (
        <div>
          <p>Destination: {itinerary.destination}</p>
          <p>Travelers: {itinerary.travelers}</p>
          <p>Travel Preference: {itinerary.travelPreference}</p>
          <p>Budget: {itinerary.budget}</p>
          <p>Hotel: {itinerary.hotel}</p>
          <p>Food: {itinerary.food}</p>
          <ul>
            {itinerary.schedule.map((item) => (
              <li key={item.day}>
                Day {item.day}: {item.activity}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AiItinerary;
