import React, { useState } from 'react';

function Popular() {
  const [whereTerm, setWhereTerm] = useState("");
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("");

  const handleWhereChange = (event) => {
    setWhereTerm(event.target.value);
  };

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };

  const handleDaysChange = (event) => {
    setDays(event.target.value);
  };

  return (
    <div className="flex justify-center w-full">
      <style>
        {`
          .destination-animation span {
            display: inline-block;
            opacity: 0;
            animation: slideIn 1s forwards;
          }
          .destination-animation span:nth-child(1) { animation-delay: 0s; }
          .destination-animation span:nth-child(2) { animation-delay: 0.1s; }
          .destination-animation span:nth-child(3) { animation-delay: 0.2s; }
          .destination-animation span:nth-child(4) { animation-delay: 0.3s; }
          .destination-animation span:nth-child(5) { animation-delay: 0.4s; }
          .destination-animation span:nth-child(6) { animation-delay: 0.5s; }
          .destination-animation span:nth-child(7) { animation-delay: 0.6s; }
          .destination-animation span:nth-child(8) { animation-delay: 0.7s; }
          .destination-animation span:nth-child(9) { animation-delay: 0.8s; }
          .destination-animation span:nth-child(10) { animation-delay: 0.9s; }

          @keyframes slideIn {
            from {
              transform: translateX(-20px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
      <div className="w-full max-w-5xl rounded-md bg-white shadow-lg p-4 flex flex-col lg:flex-row lg:items-center lg:space-x-4">
        {/* Destination with animated text */}
        <div className="relative flex-grow mb-4 lg:mb-0">
          <div className="absolute top-0 left-0 text-sm font-medium text-gray-500 destination-animation">
            {Array.from("Destination").map((letter, index) => (
              <span key={index}>{letter}</span>
            ))}
          </div>
          <input
            type="text"
            name="where"
            id="where"
            placeholder="Where to?"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 mt-6"
            onChange={handleWhereChange}
            value={whereTerm}
          />
        </div>
        {/* Budget dropdown */}
        <div className="flex-grow mb-4 lg:mb-0">
          <select
            name="budget"
            id="budget"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            onChange={handleBudgetChange}
            value={budget}
          >
            <option value="" disabled>Select Budget</option>
            <option value="budget1">$0 - $50</option>
            <option value="budget2">$51 - $100</option>
            <option value="budget3">$101 - $150</option>
            <option value="budget4">$151 - $200</option>
            <option value="budget5">$201+</option>
          </select>
        </div>
        {/* Days dropdown */}
        <div className="flex-grow mb-4 lg:mb-0">
          <select
            name="days"
            id="days"
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            onChange={handleDaysChange}
            value={days}
          >
            <option value="" disabled>Select Duration</option>
            <option value="1day">1 day</option>
            <option value="2days">2 days</option>
            <option value="3days">3 days</option>
            <option value="4days">4 days</option>
            <option value="5days">5 days</option>
          </select>
        </div>
        {/* Explore Now button */}
        <div className="flex items-center justify-center lg:ml-4">
          <button
            type="button"
            className="rounded-md font-medium text-white bg-blue-400 hover:bg-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-500 px-4 py-2"
          >
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popular;