import React from 'react';
import video from '../../assets/banner-video.mp4';

const App = () => {
  return (
    <div className="relative h-screen w-full bg-gray-100 flex justify-center items-center">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={video}
        autoPlay
        loop
        muted
      ></video>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full bg-black bg-opacity-50">
        <h1 className="text-2xl font-serif  md:text-5xl lg:text-7xl text-white font-semibold mb-4 text-center">
          Discover the Untouched Paradise
        </h1>
        <button className="bg-white text-black text-lg px-6 py-3 rounded-md shadow-md">
          View All Packages
        </button>
      </div>
    </div>
  );
};

export default App;