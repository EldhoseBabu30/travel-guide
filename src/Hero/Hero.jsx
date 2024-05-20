import React from "react";
import video from "../assets/hero.mp4";
import './Hero.css';
import SearchBar from "./SearchBar";
import ExploreCards from "../components/cards/ExploreCards";

const Hero = () => {
  return (
    <div className="relative w-full h-screen overflow-y-scroll overflow-x-hidden">
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
          <div className="my-20 text-center sm:text-left w-full px-4 md:px-20">
            <h1 className="text-white text-3xl sm:text-5xl md:text-5xl lg:text-7xl font-bold mb-4 mt-24 sm:mt-0">
              Discover Mesmerizing India <br />
              with{" "} 
              <span>Njan</span>
              <span className="text-orange-400">Sanchari</span>
            </h1>
            <p className="text-white opacity-50 text-lg sm:text-xl md:text-xl lg:text-2xl font-thin mb-8 mt-4 hidden md:block">
              Tailored Tours, Hidden Gems, and Culinary Delights in South India and Lakshadweep.<br />
              Experience the beauty, culture, and adventure with personalized travel plans, exclusive spots,<br />
              and unforgettable memories.
            </p>
          </div>
          <div className="w-full px-4 md:w-auto md:absolute md:bottom-20 md:left-12">
            <div className="flex flex-col items-center md:items-start">
              <SearchBar />
             <div className="w-full px-4 md:w-auto md:absolute md:top-24 md:left-12">
                <p className="text-white opacity-50 font-thin text-center md:text-left ">
                  Popular places: Munnar, Lakshadweep, Ooty
                </p>
             </div>
            </div>
          </div>
        </div>
      </div>
      <ExploreCards/>
    </div>
  );
};

export default Hero;
