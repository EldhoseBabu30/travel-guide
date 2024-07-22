import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { GoogleGenerativeAI } from "@google/generative-ai";

mapboxgl.accessToken = 'pk.eyJ1IjoiYWJzaGFuIiwiYSI6ImNseHZ1ajUybTBtbGcyanF6eGFid216OHAifQ.1AXCW22VbJsmDC-2oIm0yw';
const genAI = new GoogleGenerativeAI("AIzaSyBcqgvhFPrI5WlRxVbRZpmqki34rbc0lq8");

const DestinationCard = ({ title, description, price, rating, isActive }) => (
  <div className={`card bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden m-2 transform transition-transform duration-300 ${isActive ? 'scale-105 shadow-2xl' : ''}`}>
    <div className={`relative ${isActive ? 'h-48' : 'h-full'}`}>
      <img src="https://via.placeholder.com/300x200" alt={title} className="w-full h-full object-cover" />
    </div>
    {isActive && (
      <div className="p-4 transition-opacity duration-300">
        <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-700 dark:text-gray-400 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-orange-400 font-bold">${price.toFixed(2)}</span>
          <span className="flex items-center">
            <svg
              className="w-5 h-5 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 15l-5.878 3.09 1.122-6.545L.367 7.09l6.564-.955L10 0l2.09 6.135 6.543.955-4.874 4.455 1.122 6.545L10 15z" />
            </svg>
            <span className="ml-1 text-gray-900 dark:text-white">{rating}/5 Ratings</span>
          </span>
        </div>
      </div>
    )}
  </div>
);

const NextArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 dark:bg-gray-700 p-2 rounded-full shadow-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 z-10"
    onClick={onClick}
  >
    <svg
      className="w-6 h-6 text-gray-700 dark:text-gray-300"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 dark:bg-gray-700 p-2 rounded-full shadow-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 z-10"
    onClick={onClick}
  >
    <svg
      className="w-6 h-6 text-gray-700 dark:text-gray-300"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" d="M12.707 14.707a1 1 0 010-1.414L9.414 10l3.293-3.293a1 1 0 10-1.414-1.414l-4 4a1 1 0 000 1.414l4 4a1 1 0 001.414 0z" clipRule="evenodd" />
    </svg>
  </button>
);

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load initial destinations when the component mounts
    fetchDestinations("popular travel destinations");
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    getSuggestions(value);
  };

  const getSuggestions = async (input) => {
    if (input.length > 2) {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        input
      )}.json?access_token=${mapboxgl.accessToken}&types=place`;

      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setSuggestions(data.features.map((feature) => feature.place_name));
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetchDestinations(searchTerm);
    setLoading(false);
  };

  const handleSuggestionClick = async (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    setLoading(true);
    await fetchDestinations(suggestion);
    setLoading(false);
  };

  const fetchDestinations = async (query) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `Generate 5 travel destination suggestions based on the search query: "${query}".
    For each destination, provide:
    1. Title (destination name)
    2. Brief description (20-30 words)
    3. Estimated price (as a number)
    4. Rating (as a number out of 5)
    
    Return the results as a JSON array of objects with the following structure:
    [
      {
        "title": "Destination Name",
        "description": "Brief description of the destination",
        "price": 1234.56,
        "rating": 4.5
      },
      ...
    ]`;

    try {
      const result = await model.generateContent(prompt);
      const destinationsData = JSON.parse(result.response.text());
      setDestinations(destinationsData);
    } catch (error) {
      console.error("Error fetching destinations:", error);
      setDestinations([]);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  };

  return (
    <div className="h-screen container mx-auto px-4 py-16 dark:bg-gray-900">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-900 dark:text-white">
        Find your best <span className="text-orange-400">destination</span>
      </h1>
      <p className="text-center mb-12 text-gray-700 dark:text-gray-300">Search for your dream destinations</p>
      <div className="flex justify-center mb-12">
        <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search Destinations..."
            className="w-full py-2 pl-10 pr-4 border border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 dark:bg-gray-800 dark:text-gray-300"
          />
          <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.9 14.32a8 8 0 111.42-1.42l4.38 4.37-1.42 1.42-4.38-4.37zm-6.4-11.44a6 6 0 100 12 6 6 0 000-12z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md mt-1 max-h-60 overflow-auto">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
      {loading ? (
        <p className="text-center">Loading destinations...</p>
      ) : destinations.length > 0 ? (
        <Slider {...settings}>
          {destinations.map((destination, index) => (
            <DestinationCard
              key={index}
              {...destination}
              isActive={currentSlide === index}
            />
          ))}
        </Slider>
      ) : (
        <p className="text-center">Search for a destination to see suggestions!</p>
      )}
    </div>
  );
};

export default App;