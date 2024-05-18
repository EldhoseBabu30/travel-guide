import React from "react";
import video from "../assets/hero.mp4";
import './Hero.css';
import ActionAreaCard from "./Popular";

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
          <div className="bg-white rounded-full max-w-md sm:max-w-lg md:max-w-2xl w-full mx-auto mt-8 md:mt-[21rem] p-4">
            <form className="flex flex-col sm:flex-row md:flex-row items-center">
              <div className="w-full mb-4 sm:mb-0 sm:mr-2 md:mb-0 md:mr-2">
                <div className="bg-white rounded-xl px-2.5 py-2.5 shadow-md">
                  <input
                    type="text"
                    placeholder="Where to?"
                    className="outline-none rounded-xl px-4 py-2 w-full"
                    name="destination"
                    required
                  />
                </div>
              </div>
              <div className="w-full mb-4 sm:mb-0 sm:mr-2 md:mb-0 md:mr-2">
                <div className="bg-white rounded-xl px-2.5 py-2.5 shadow-md">
                  <select
                    className="outline-none rounded-xl px-2 py-2 w-full"
                    name="budget"
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
              </div>
              <div className="w-full mb-4 sm:mb-0 sm:mr-2 md:mb-0 md:mr-2">
                <div className="bg-white rounded-xl px-2.5 py-2.5 shadow-md">
                  <select
                    className="outline-none rounded-xl px-2 py-2 w-full"
                    name="duration"
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
              </div>
              <button
                className="inline-flex rounded-full items-center h-12 bg-indigo-500 text-white px-8 py-3 mt-4 sm:mt-0 sm:ml-2 md:mt-0 md:ml-2"
                type="submit"
              >
                Explore Now
              </button>
            </form>
          </div>
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
