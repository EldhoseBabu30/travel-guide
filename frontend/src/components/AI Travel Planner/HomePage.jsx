import React from 'react';
import TripForm from './TripForm';

const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Welcome to TripPlanner AI</h1>
      <p>Plan your perfect trip with our AI-powered trip planner.</p>
      <TripForm />
    </div>
  );
};

export default HomePage;
