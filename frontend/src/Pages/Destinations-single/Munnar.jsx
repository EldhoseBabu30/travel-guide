// src/components/TravelSection.js
import React from 'react';

const Munnar = () => {
  return (
    <div className="relative bg-cover bg-center h-screen" style={{ backgroundImage: "url('/path/to/your/image.png')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-4xl md:text-6xl font-bold">Travel to Munnar</h1>
        <p className="mt-4 text-lg md:text-xl">Whatever you want, our experts can make it happen.</p>
        <div className="mt-8 flex space-x-4">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
            Craft your trip
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-2 px-4 rounded">
            How it works
          </button>
        </div>
        <div className="absolute bottom-4 left-4 space-y-2 text-left">
          <p>Best time to visit</p>
          <p>March to May or October to November</p>
        </div>
        <div className="absolute bottom-4 right-4 space-y-2 text-right">
          <p>Capital</p>
          <p>Buenos Aires</p>
          <p>Population</p>
          <p>45.5M</p>
          <p>Area</p>
          <p>2,780,400 SQ KM</p>
          <p>Official language</p>
          <p>Spanish</p>
        </div>
      </div>
    </div>
  );
};

export default Munnar;
