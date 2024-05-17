import React from "react";
import video from "../assets/hero.mp4";

const Hero = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        src={video}
        type="mp4"
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-10"
      />
      <div className="relative   top-0 left-0 w-full h-full bg-black/50 z-20">
        <div className="flex  items-center justify-center w-full h-full relative z-30">
          <div className="bg-white rounded-full h-16 max-w-6xl w-full mx-auto ">
            {" "}
            <form className="flex flex-col md:flex-row">
              <div className="py-1.5 px-2.5 flex-1 border-r-2">
               
                <div className="flex py-6 flex-row">
                  <input
                    type="text"
                    placeholder="Where to?"
                    className="outline-none rounded-xl px-2 py-2 w-full"
                    name="destination"
                    required
                  />
                </div>
              </div>
              <div className="py-8 px-2.5 flex-1 border-r-2">
               
                <select
                  className="outline-none rounded-xl px-2 py-2 w-full"
                  name="budget"
                
                  required
                >
                  <option className="gray-500"  value="" hidden>
                   Budget
                  </option>
                  <option>1000-10000</option>
                  <option>10001-20000</option>
                  <option>20001-30000</option>
                  <option>30001-40000</option>
                  <option>40001-50000</option>
                </select>
              </div>
              <div className="py-8 px-2.5 flex-1 border-r-2">
               
                <select
                  className="outline-non rounded-xl  px-2 py-2 w-full"
                  name="duration"
                  required
                >
                  <option value="" hidden>
                    Duration
                  </option>
                  <option>1</option>
                  <option>3</option>
                  <option>5</option>
                  <option>7</option>
                  <option>10</option>
                </select>
              </div>
              <button
                className="inline-flex rounded-full items-center h-8  bg-indigo-500 text-white px-8 py-5 mx-2 my-7  space-x-2"
                type="submit"
              >
                Book Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
