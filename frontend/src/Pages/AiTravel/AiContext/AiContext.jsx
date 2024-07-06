// src/context/TravelContext.jsx
import React, { createContext, useState, useContext } from 'react';

const TravelContext = createContext();

export const TravelProvider = ({ children }) => {
  const [travelData, setTravelData] = useState({
    destination: '',
    destinationImage: '',
    travelers: '',
    tripDates: '',
    interests: [],
    budget: '',
  });

  return (
    <TravelContext.Provider value={{ travelData, setTravelData }}>
      {children}
    </TravelContext.Provider>
  );
};

export const useTravelContext = () => useContext(TravelContext);
