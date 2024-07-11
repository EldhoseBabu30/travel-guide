import React, { createContext, useState } from 'react';

export const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [tripData, setTripData] = useState({
    destination: '',
    destinationCoordinates: [],
    travelers: { type: '', count: 1 },
    tripDates: { startDate: '', endDate: '' },
    tripType: '',
    budget: '',
    accommodation: { name: '', location: '', roomType: '' },
    dining: { meals: [], dietaryRequirements: '' },
  });

  return (
    <TripContext.Provider value={{ tripData, setTripData }}>
      {children}
    </TripContext.Provider>
  );
};