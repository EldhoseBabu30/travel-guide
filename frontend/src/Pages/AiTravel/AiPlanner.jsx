// src/pages/AiTravel/AiPlanner.jsx
import React from 'react';

import { Route, Routes } from 'react-router-dom';
import AiTravelHome from './AiTravelHome';
import AiSelect from './AiSelect';
import AiSchedule from './AiSchedule';
import AiBudget from './AiBudget';
import AiHotel from './AiHotel';
import AiFood from './AiFood';
import AiFinalize from './AiFinalize';
import AiItinerary from './AiItenerary';

const AiPlanner = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AiTravelHome />} />
        <Route path="/ai-select" element={<AiSelect />} />
        <Route path="/ai-schedule" element={<AiSchedule />} />
        <Route path="/ai-budget" element={<AiBudget />} />
        <Route path="/ai-hotel" element={<AiHotel />} />
        <Route path="/ai-food" element={<AiFood />} />
        <Route path="/ai-finalize" element={<AiFinalize />} />
        <Route path="/ai-itinerary" element={<AiItinerary />} />
      </Routes>
    </div>
  );
};

export default AiPlanner;
