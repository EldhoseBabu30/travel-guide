import React, { createContext, useState } from 'react';

export const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [tripData, setTripData] = useState({
    destination: 'defaultDestination',
    travelers: { type: 'defaultType', count: 1 },
    tripDates: { startDate: new Date().toISOString().split('T')[0], endDate: new Date().toISOString().split('T')[0] },
    tripType: 'defaultTripType',
    budget: 'defaultBudget',
    accommodation: { name: 'defaultAccommodation', location: 'defaultLocation', roomType: 'defaultRoomType' },
    dining: { meals: ['defaultMeal'], dietaryRequirements: 'None' },
  });

  return (
    <TripContext.Provider value={{ tripData, setTripData }}>
      {children}
    </TripContext.Provider>
  );
};
