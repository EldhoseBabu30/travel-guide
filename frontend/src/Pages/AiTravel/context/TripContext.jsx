// TripContext.jsx
import React, { createContext, useState, useContext } from 'react';
import { useSelector } from 'react-redux';

const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [tripData, setTripData] = useState(currentUser?.trip || {
    destination: "",
    travelers: { type: "", count: 1 },
    tripDates: { startDate: null, endDate: null },
    tripType: "",
    budget: "",
    accommodation: { name: "", location: "", roomType: "" },
    dining: { name: "", location: "", cuisine: "", mealTime: "" },
  });

  const updateTripData = (newData) => {
    setTripData(prevData => ({ ...prevData, ...newData }));
  };

  return (
    <TripContext.Provider value={{ tripData, updateTripData }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTripContext = () => {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTripContext must be used within a TripProvider');
  }
  return context;
};

// Make sure to export TripContext as well
export { TripContext };