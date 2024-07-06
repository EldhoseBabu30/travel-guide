// src/AiTravel/AiContext/AiContext.js
import React, { createContext, useContext, useState } from 'react';

const TravelContext = createContext();

export const TravelProvider = ({ children }) => {
  const [travelData, setTravelData] = useState({
    destination: '',
    travelers: '',
    startDate: '',
    endDate: '',
    preferences: [],
    budget: '',
  });

  return (
    <TravelContext.Provider value={{ travelData, setTravelData }}>
      {children}
    </TravelContext.Provider>
  );
};

export const useTravelContext = () => useContext(TravelContext);
