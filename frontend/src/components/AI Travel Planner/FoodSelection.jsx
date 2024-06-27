import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FoodSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { destination, days, people, focus, budget } = location.state;

  const foodSpots = [
    { name: 'Restaurant A', type: 'Italian', rating: 4.5, location: 'Downtown' },
    { name: 'Restaurant B', type: 'Chinese', rating: 4.0, location: 'Uptown' },
    // Add more food spots as needed
  ];

  const handleNext = () => {
    navigate('/itinerary', { state: location.state });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Select Your Food Spots</h1>
      <p>Destination: {destination}</p>
      <p>Days: {days}</p>
      <p>People: {people}</p>
      <p>Focus: {focus}</p>
      <p>Budget: {budget}</p>
      <div>
        {foodSpots.map((spot, index) => (
          <div key={index} className="food-card">
            <h2>{spot.name}</h2>
            <p>Type: {spot.type}</p>
            <p>Rating: {spot.rating} stars</p>
            <p>Location: {spot.location}</p>
          </div>
        ))}
      </div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default FoodSelection;
