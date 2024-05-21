import React from 'react';
import video from '../../assets/banner-video.mp4';

const App = () => {
  return (
    <div className="relative h-screen w-full">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={video}
        autoPlay
        loop
        muted
      ></video>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
        <h1 className="text-transparent bg-clip-text bg-gradient-to-b from-white to-orange-300 font-tusker text-center uppercase tracking-widest drop-shadow-lg text-xl sm:text-2xl md:text-4xl lg:text-[80px] leading-relaxed sm:leading-relaxed md:leading-tight whitespace-normal px-4 sm:px-6 md:px-8">
          Discover the Untouched Paradise
        </h1>

        <button className="mt-8 shadow-md rounded-md px-6 py-3 bg-orange-400 text-white hover:bg-white hover:text-orange-400 transition-all text-sm font-inter flex items-center justify-center">
          View All Packages
        </button>
      </div>
    </div>
  );
};

export default App;
