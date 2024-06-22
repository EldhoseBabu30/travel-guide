// PlanPage.jsx

import React from 'react';
import { useLocation } from 'react-router-dom';

const PlanPage = () => {
  const location = useLocation();
  const { travelPlan } = location.state || {};

  if (!travelPlan) {
    return <div>No travel plan available.</div>;
  }

  return (
    <div className="container">
      <h2>Your Travel Plan</h2>
      <pre>{JSON.stringify(travelPlan, null, 2)}</pre>
    </div>
  );
};

export default PlanPage;
