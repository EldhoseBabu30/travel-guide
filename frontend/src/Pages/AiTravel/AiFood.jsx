// src/components/AiFood.jsx
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Map from './Map';
import { TripContext } from '../AiTravel/context/TripContext';

const AiFood = () => {
  const { tripData, setTripData } = useContext(TripContext);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [foodSpots, setFoodSpots] = useState([]);
  const [filteredSpots, setFilteredSpots] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [radius, setRadius] = useState(2500); // in meters
  const [foodCategories, setFoodCategories] = useState([]);
  const [mealTimes, setMealTimes] = useState([]);
  const [customerRatings, setCustomerRatings] = useState([]);
  const [mapCenter, setMapCenter] = useState([76.2711, 10.8505]); // Initial map center coordinates
  const navigate = useNavigate();

  const fetchFoodSpots = async (center) => {
    const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/restaurant.json`, {
      params: {
        proximity: `${center[0]},${center[1]}`,
        limit: 10,
        access_token: 'pk.eyJ1IjoiYWJzaGFuIiwiYSI6ImNseHZ1ajUybTBtbGcyanF6eGFid216OHAifQ.1AXCW22VbJsmDC-2oIm0yw',
      },
    });

    const fetchedSpots = response.data.features.map((feature, index) => ({
      id: feature.id,
      name: feature.text,
      rating: Math.floor(Math.random() * 5) + 1, // Replace with actual data if available
      location: feature.geometry.coordinates,
      price: Math.floor(Math.random() * 100) * 10 + 100, // Replace with actual data if available
      image: `https://source.unsplash.com/200x200/?restaurant,${index}`,
      address: feature.place_name,
      categories: ['Indian', 'Italian', 'Chinese', 'Japanese', 'Mexican', 'Vegetarian', 'Non-Vegetarian'],
      mealTimes: ['Breakfast', 'Lunch', 'Dinner'],
    }));
    setFoodSpots(fetchedSpots);
    setFilteredSpots(fetchedSpots); // Initialize filteredSpots with all spots
  };

  useEffect(() => {
    fetchFoodSpots(mapCenter);
  }, [mapCenter, radius]);

  const handleSpotSelect = (spot) => {
    setSelectedSpot(spot);
    setTripData({
      ...tripData,
      dining: { meals: spot.categories, dietaryRequirements: spot.dietaryRequirements },
    });
  };

  const handleContinue = () => {
    if (!selectedSpot) {
      alert('Please select a spot.');
    } else {
      navigate('/summary');
    }
  };

  const handleContinueWithoutSpot = () => {
    navigate('/summary');
  };

  const handleRadiusChange = (event) => {
    setRadius(event.target.value);
  };

  const handleFoodCategoryChange = (category) => {
    setFoodCategories((prevCategories) =>
      prevCategories.includes(category) ? prevCategories.filter((c) => c !== category) : [...prevCategories, category]
    );
    filterSpots(foodSpots, foodCategories, mealTimes, customerRatings);
  };

  const handleMealTimeChange = (time) => {
    setMealTimes((prevTimes) =>
      prevTimes.includes(time) ? prevTimes.filter((t) => t !== time) : [...prevTimes, time]
    );
    filterSpots(foodSpots, foodCategories, mealTimes, customerRatings);
  };

  const handleCustomerRatingChange = (rating) => {
    setCustomerRatings((prevRatings) =>
      prevRatings.includes(rating) ? prevRatings.filter((r) => r !== rating) : [...prevRatings, rating]
    );
    filterSpots(foodSpots, foodCategories, mealTimes, customerRatings);
  };

  const filterSpots = (allSpots, categories, times, ratings) => {
    const filtered = allSpots.filter((spot) => {
      const matchesCategory = categories.length === 0 || categories.some((category) => spot.categories.includes(category));
      const matchesTime = times.length === 0 || times.some((time) => spot.mealTimes.includes(time));
      const matchesRating = ratings.length === 0 || ratings.includes(spot.rating.toString());
      return matchesCategory && matchesTime && matchesRating;
    });
    setFilteredSpots(filtered);
  };

  const handleSearch = async (query) => {
    const response = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/restaurant.json', {
      params: {
        access_token: 'pk.eyJ1IjoiYWJzaGFuIiwiYSI6ImNseHZ1ajUybTBtbGcyanF6eGFid216OHAifQ.1AXCW22VbJsmDC-2oIm0yw',
        proximity: '76.2711,10.8505',
        types: 'poi',
        query: query,
      },
    });

    const features = response.data.features.map((feature) => ({
      type: 'Feature',
      properties: {
        id: feature.id,
        name: feature.text,
        address: feature.place_name,
      },
      geometry: {
        type: 'Point',
        coordinates: feature.center,
      },
    }));

    setSearchResults(features);
  };

  const handleMapMove = (center) => {
    setMapCenter([center.lng, center.lat]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-h-screen bg-white">
      <div className="p-4 col-span-1 md:col-span-1">
        <h1 className="text-4xl font-bold text-orange-500 mb-4">🍽️ Select Your Food 🥘</h1>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Select Food Category</h2>
          <div className="flex flex-wrap gap-4">
            {['Indian', 'Italian', 'Chinese', 'Japanese', 'Mexican', 'Vegetarian', 'Non-Vegetarian'].map((category) => (
              <button
                key={category}
                className={`py-2 px-4 border ${foodCategories.includes(category) ? 'bg-orange-500 text-white' : 'bg-white text-orange-500'} border-orange-500`}
                onClick={() => handleFoodCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Select Meal Time</h2>
          <div className="flex flex-wrap gap-4">
            {['Breakfast', 'Lunch', 'Dinner'].map((time) => (
              <button
                key={time}
                className={`py-2 px-4 border ${mealTimes.includes(time) ? 'bg-orange-500 text-white' : 'bg-white text-orange-500'} border-orange-500`}
                onClick={() => handleMealTimeChange(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Customer Ratings</h2>
          <div className="flex flex-wrap gap-4">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                className={`py-2 px-4 border ${customerRatings.includes(rating.toString()) ? 'bg-orange-500 text-white' : 'bg-white text-orange-500'} border-orange-500`}
                onClick={() => handleCustomerRatingChange(rating.toString())}
              >
                {rating} ⭐
              </button>
            ))}
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Search Food Spots within the Radius</h2>
          <input
            type="range"
            min="500"
            max="5000"
            step="100"
            value={radius}
            onChange={handleRadiusChange}
            className="w-full"
          />
          <p className="mt-2 text-lg">Radius: {radius / 1000} km</p>
        </div>
        <div className="mt-8 flex flex-col gap-4">
          <button className="py-2 px-4 bg-orange-500 text-white" onClick={handleContinueWithoutSpot}>
            Continue Without Spot
          </button>
          <button className="py-2 px-4 bg-orange-500 text-white" onClick={handleContinue}>
            Continue
          </button>
        </div>
        {selectedSpot && (
          <div className="mt-8 p-4 border border-gray-300 rounded-lg">
            <h4 className="text-xl font-semibold">{selectedSpot.name}</h4>
            <p className="mt-2">Address: {selectedSpot.address}</p>
            <p>Price: ₹{selectedSpot.price}</p>
            <p>Rating: {selectedSpot.rating} ⭐</p>
            <img src={selectedSpot.image} alt={selectedSpot.name} className="mt-4 w-full h-auto" />
          </div>
        )}
      </div>
      <div className="col-span-2 relative">
        <input
          type="text"
          placeholder="Search for food spots"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(e.target.value);
            }
          }}
          className="absolute top-4 left-4 z-10 w-72 p-2 border border-gray-300 rounded-lg"
        />
        <Map
          hotels={[]} // Empty array since AiFood.jsx is only for food spots
          foodSpots={filteredSpots}
          searchResults={searchResults}
          onHotelSelect={() => {}} // No-op function
          onSpotSelect={handleSpotSelect}
          onMapMove={handleMapMove}
          selectedHotel={null}
          selectedSpot={selectedSpot}
        />
        <div className="absolute bottom-0 left-0 w-full bg-white p-4">
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={true}
            responsive={{
              superLargeDesktop: {
                breakpoint: { max: 4000, min: 3000 },
                items: 5,
              },
              desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 3,
              },
              tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2,
              },
              mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
              },
            }}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={['tablet', 'mobile']}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {filteredSpots.map((spot) => (
              <div
                key={spot.id}
                className="border border-gray-300 rounded-lg overflow-hidden cursor-pointer m-2"
                onClick={() => handleSpotSelect(spot)}
              >
                <img src={spot.image} alt={spot.name} className="w-full h-auto" />
                <div className="p-4">
                  <h4 className="text-lg font-semibold">{spot.name}</h4>
                  <p className="mt-2">Price: ₹{spot.price}</p>
                  <p>Rating: {spot.rating} ⭐</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default AiFood;
