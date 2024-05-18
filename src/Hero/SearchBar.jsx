import React, { useState } from 'react';

function SearchBar() {
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
    <div className="flex justify-center w-full p-4">
      <div className="w-full max-w-4xl bg-white shadow-lg p-4 flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 rounded-lg lg:rounded-full">
        {/* Where to input */}
        <div className="flex-grow">
          <input
            type="text"
            name="where"
            id="where"
            placeholder="Where to?"
            className="w-full bg-white rounded-lg lg:rounded-full px-4 py-2.5 shadow-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            onChange={handleWhereChange}
            value={whereTerm}
          />
        </div>
        {/* Budget dropdown */}
        <div className="flex-grow">
          <select
            className="w-full bg-white rounded-lg lg:rounded-full px-4 py-2.5 shadow-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            name="budget"
            onChange={handleBudgetChange}
            value={budget}
            required
          >
            <option value="" hidden>Budget</option>
            <option>1000-10000</option>
            <option>10001-20000</option>
            <option>20001-30000</option>
            <option>30001-40000</option>
            <option>40001-50000</option>
          </select>
        </div>
        {/* Days dropdown */}
        <div className="flex-grow">
          <select
            className="w-full bg-white rounded-lg lg:rounded-full px-4 py-2.5 shadow-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            name="duration"
            onChange={handleDaysChange}
            value={days}
            required
          >
            <option value="" hidden>Duration</option>
            <option>1</option>
            <option>3</option>
            <option>5</option>
            <option>7</option>
            <option>10</option>
          </select>
        </div>
        {/* Explore Now button */}
        <div className="w-full lg:w-auto flex justify-center lg:justify-end">
          <button
            type="button"
            className="w-full lg:w-auto rounded-lg lg:rounded-full font-medium text-white bg-blue-400 hover:bg-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-500 px-4 py-2"
          >
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
