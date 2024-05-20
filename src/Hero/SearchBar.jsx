import React, { useState } from 'react';

function SearchBar() {

  const [travelData, setTravelData] = useState({
    whereTerm: "",
    budget: "",
    days: "",
  });



  return (
    <div className="flex justify-center w-full p-4">
      <div style={{ zIndex: 1000 }} className="w-full max-w-4xl bg-white shadow-lg p-4 flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 rounded-lg lg:rounded-full">
        {/* Where to input */}
        <div className="flex-grow">
          <input
            type="text"
            name="where"
            id="where"
            placeholder="Where to?"
            className="w-full bg-white rounded-lg lg:rounded-full px-4 py-2.5 shadow-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            onChange={(e) => { setTravelData({ ...travelData, whereTerm: e.target.value }) }}
            value={travelData.whereTerm}
          />
        </div>
        {/* Budget dropdown */}
        <div className="flex-grow">
          <select
            className="w-full bg-white rounded-lg lg:rounded-full px-4 py-2.5 shadow-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            name="budget"
            onChange={(e) => { setTravelData({ ...travelData, budget: e.target.value }) }}
            value={travelData.budget}
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
            onChange={(e) => { setTravelData({ ...travelData, days: e.target.value }) }}
            value={travelData.days}
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
            className="w-full lg:w-auto rounded-lg lg:rounded-full 
            border border-orange-400 bg-orange-400 py-2 px-4 text-white transition-all 
            hover:bg-white hover:text-orange-400 text-center text-sm font-inter flex items-center justify-center"
          >
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
