import React, { useState, useEffect } from 'react';
import video from "../assets/hero.mp4";
import SearchBar from "./SearchBar";
import ExploreCards from "../components/cards/ExploreCards";
import BannerVideo from "../components/banner-video/BannerVideo";
import Bookings from "../components/Bookings/Bookings";
import ChooseUs from "../components/ChooseUs/ChooseUs";
import FloatingButton from "../components/FloatingButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import HowItWorksSection from '../components/How/HowIt';
import BookNowSection from '../components/BookNow/BookNow';
import Footer from '../components/Footer/Footer';

const Hero = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="relative w-full h-screen overflow-y-scroll overflow-x-hidden bg-gray-100 dark:bg-gray-900">
      <video
        src={video}
        type="video/mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-10"
      />
      <div className="relative top-0 left-0 w-full h-full bg-black/50 dark:bg-black/70 z-20">
        <div className="flex flex-col justify-center w-full h-full relative z-30 px-4 md:px-20">
          <div className="my-20 text-left w-full">
            <h1 className="text-white text-3xl sm:text-5xl md:text-5xl lg:text-7xl font-bold mb-4">
              Discover Mesmerizing India <br />
              with{" "} 
              <span className="text-white">Njan</span>
              <span className="text-orange-400 animate-color-change">Sanchari</span>
            </h1>
            <p className="text-white opacity-50 text-lg sm:text-xl md:text-xl lg:text-2xl font-thin mb-8 mt-4 hidden md:block">
              Tailored Tours, Hidden Gems, and Culinary Delights in South India and Lakshadweep.<br />
              Experience the beauty, culture, and adventure with personalized travel plans, exclusive spots,<br />
              and unforgettable memories.
            </p>
          </div>
          <div className="w-full md:w-3/4">
            <SearchBar />
            <p className="text-gray-300 dark:text-gray-400 opacity-50 font-thin text-left mt-2">
              Popular places: Munnar, Lakshadweep, Ooty
            </p>
          </div>
        </div>
      </div>
      <div className="mb-8 md:mb-16">
        <ExploreCards />
      </div>
      <BannerVideo />
      <Bookings />
      <ChooseUs />
      <HowItWorksSection/>
      <BookNowSection/>
      <Footer/>
      <FloatingButton />
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 z-50 p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full shadow-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
      </button>
    </div>
  );
};

export default Hero;