import React from 'react';
import video from '../assets/hero.mp4';

const Hero = () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      
     <video src={video} type="mp4" autoPlay loop muted className="w-full h-full object-cover">
  
</video>
     <div className="bg-white rounded-md max-w-6xl w-full mx-auto">
      <form  className="flex flex-col md:flex-row">
      <div className="py-1.5 px-2.5 flex-1 border-r-2">
            <p>Where to?</p>
            <div className="flex flex-row">
            <input
              type="text"
              className="outline-none px-2 py-2 w-full date"
              name="destination"
              required
            />
             
            </div>
          </div>
          <div className="py-1.5 px-2.5 flex-1 border-r-2">
            <p>Budget</p>
            <select
                className="outline-none px-2 py-2 w-full"
                name="budget"
                required
              >
                <option value="" hidden>
                  Please Select
                </option>
                <option>1000-10000</option>
                <option>10001-20000</option>
                <option>20001-30000</option>
                <option>30001-40000</option>
                <option>40001-50000</option>
              </select>
          </div>
          <div className="py-1.5 px-2.5 flex-1 border-r-2">
            <p>Duration</p>
            <select
                className="outline-none px-2 py-2 w-full"
                name="budget"
                required
              >
                <option value="" hidden>
                  Please Select
                </option>
                <option>1</option>
                <option>3</option>
                <option>5</option>
                <option>7</option>
                <option>10</option>
              </select>
          </div>
          <button
            className="inline-flex items-center bg-indigo-500 text-white px-8 py-1 space-x-2"
            type="submit"
          >Book Now</button>
      </form>
    </div>
    </div>
  );
};

export default Hero;
