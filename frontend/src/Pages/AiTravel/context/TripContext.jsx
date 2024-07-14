import React, { createContext, useState } from "react";

export const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [tripData, setTripData] = useState({
    destination: "",
    destinationCoordinates: [],
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