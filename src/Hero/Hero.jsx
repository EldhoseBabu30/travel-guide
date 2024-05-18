import React from "react";
import video from "../assets/hero.mp4";
import './Hero.css';
import Popular from "./SearchBar";

const Hero = () => {
  return (
    <div className="relative w-full h-screen overflow-scroll">
      <video
        src={video}
        type="mp4"
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-10"
      />
      <div className="relative top-0 left-0 w-full h-full bg-black/50 z-20">
        <div className="flex items-center justify-center w-full h-full relative z-30 flex-col">
          <div className="my-20 text-center sm:text-left">
            <h1 className="text-white text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-bold mb-4 sm:static md:absolute md:top-48 md:left-20">
              Discover Mesmerizing India <br />
              with NjanSanchari
            </h1>
            <p className="text-white opacity-50 text-lg sm:text-xl md:text-xl lg:text-2xl font-thin mb-8 sm:static md:absolute md:top-[22rem] md:left-20">
              Tailored Tours, Hidden Gems, and Culinary Delights in South India and Lakshadweep.<br />
              Experience the beauty, culture, and adventure with personalized travel plans, exclusive spots,<br />
              and unforgettable memories.
            </p>
          </div>
          <Popular/>

        
          <p className="absolute left-1/2 transform -translate-x-1/2 bottom-12 text-white opacity-50 font-thin sm:static sm:text-center md:left-24">
            Popular places: Munnar, Lakshadweep, Ooty
          </p>
        </div>
      </div>
      <div className="relative w-full h-screen overflow-scroll">
        <div className="relative top-0 left-0 w-full h-full bg-white z-20">
          <div className="flex items-center justify-center w-full h-full relative z-30 flex-col">
            <div className="my-20 text-center sm:text-left">
              <h1 className="text-black text-2xl sm:text-5xl md:text-5xl lg:text-5xl font-bold mb-4 sm:static md:absolute md:top-48 md:left-20">
                Explore new worlds with
                exotic natural scenery
              </h1>
              <p className="text-white opacity-50 text-lg sm:text-xl md:text-xl lg:text-2xl font-thin mb-8 sm:static md:absolute md:top-[22rem] md:left-20">
                Tailored Tours, Hidden Gems, and Culinary Delights in South India and Lakshadweep.<br />
                Experience the beauty, culture, and adventure with personalized travel plans, exclusive spots,<br />
                and unforgettable memories.
              </p>
            </div>
          </div>
        </div>
      </div>







    </div>

  );

};



export default Hero;
