import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const HotelSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { destination, days, people, focus, budget } = location.state;

  const hotels = [
    { name: 'Hotel A', price: 100, review: 4.5, location: 'City Center' },
    { name: 'Hotel B', price: 80, review: 4.0, location: 'Near Airport' },
    // Add more hotels as needed
  ];

  const handleNext = () => {
    navigate('/food', { state: location.state });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Select Your Hotel</h1>
      <p>Destination: {destination}</p>
      <p>Days: {days}</p>
      <p>People: {people}</p>
      <p>Focus: {focus}</p>
      <p>Budget: {budget}</p>
      <div>
        {hotels.map((hotel, index) => (
          <div key={index} className="hotel-card">
            <h2>{hotel.name}</h2>
            <p>Price: ${hotel.price}</p>
            <p>Review: {hotel.review} stars</p>
            <p>Location: {hotel.location}</p>
          </div>
        ))}
      </div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default HotelSelection;
