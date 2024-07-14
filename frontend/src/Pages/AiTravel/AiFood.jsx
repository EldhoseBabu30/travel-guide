import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaStar,
  FaUtensils,
  FaCoffee,
  FaPizzaSlice,
  FaHamburger,
  FaLeaf,
  FaDrumstickBite,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { TripContext } from "../AiTravel/context/TripContext";
import mapboxgl from "mapbox-gl";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWJzaGFuIiwiYSI6ImNseHZ1ajUybTBtbGcyanF6eGFid216OHAifQ.1AXCW22VbJsmDC-2oIm0yw";

const AiFood = () => {
  const { tripData, setTripData } = useContext(TripContext);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [foodSpots, setFoodSpots] = useState([]);
  const [filteredSpots, setFilteredSpots] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: tripData.destinationCoordinates[1],
    longitude: tripData.destinationCoordinates[0],
    zoom: 12,
  });
  const [popupInfo, setPopupInfo] = useState(null);
  const [radius, setRadius] = useState(2500);
  const [foodRatings, setFoodRatings] = useState([]);
  const [customerReviews, setCustomerReviews] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [mealTimes, setMealTimes] = useState([]);
  const [avgPrice, setAvgPrice] = useState(0);
  const mapRef = useRef();
  const navigate = useNavigate();

  const cuisineTypes = [
    { name: "Indian", icon: FaUtensils },
    { name: "Chinese", icon: FaUtensils },
    { name: "Mexican", icon: FaUtensils },
    { name: "Arabian", icon: FaUtensils },
    { name: "Non-Veg", icon: FaDrumstickBite },
    { name: "Veg", icon: FaLeaf },
  ];

  const mealTimeOptions = [
    { name: "Breakfast", icon: FaCoffee },
    { name: "Lunch", icon: FaPizzaSlice },
    { name: "Dinner", icon: FaHamburger },
  ];

  useEffect(() => {
    fetchFoodSpotsForLocation(
      tripData.destinationCoordinates[0],
      tripData.destinationCoordinates[1]
    );
  }, [tripData.destinationCoordinates, radius]);

  const fetchFoodSpotsForLocation = async (lon, lat) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/restaurant.json`,
        {
          params: {
            proximity: `${lon},${lat}`,
            limit: 20,
            access_token: mapboxgl.accessToken,
          },
        }
      );

      const fetchedSpots = response.data.features.map((feature) => ({
        id: feature.id,
        name: feature.text,
        rating: Math.floor(Math.random() * 5) + 1,
        location: feature.center,
        price: Math.floor(Math.random() * 100) * 10 + 100,
        image: `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${feature.center[0]},${feature.center[1]},15,0/300x200@2x?access_token=${mapboxgl.accessToken}`,
        address: feature.place_name,
        category:
          cuisineTypes[Math.floor(Math.random() * cuisineTypes.length)].name,
        mealTime:
          mealTimeOptions[Math.floor(Math.random() * mealTimeOptions.length)]
            .name,
      }));

      setFoodSpots(fetchedSpots);
      setFilteredSpots(fetchedSpots);
      calculateAvgPrice(fetchedSpots);
    } catch (error) {
      console.error("Error fetching food spots:", error);
    }
  };

  const calculateAvgPrice = (spotList) => {
    const total = spotList.reduce((sum, spot) => sum + spot.price, 0);
    setAvgPrice(Math.round(total / spotList.length));
  };

  const handleSpotSelect = (spot) => {
    setSelectedSpot(spot);
    updateTripData({
      dining: {
        name: spot.name,
        location: spot.address,
        cuisine: spot.category,
        mealTime: spot.mealTime,
      },
    });
    setViewport({
      ...viewport,
      latitude: spot.location[1],
      longitude: spot.location[0],
      zoom: 14,
    });
    setPopupInfo(spot);
  };

  const handleContinue = () => {
    if (!selectedSpot) {
      alert("Please select a food spot.");
    } else {
      navigate("/summary");
    }
  };

  const handleContinueWithoutFood = () => {
    navigate("/summary");
  };

  const handleRadiusChange = (value) => {
    setRadius(value);
    setViewport({
      ...viewport,
      zoom: 12 - Math.log2(value / 1000),
    });
    filterSpots();
  };

  const handleFoodRatingChange = (rating) => {
    setFoodRatings((prevRatings) =>
      prevRatings.includes(rating.toString())
        ? prevRatings.filter((r) => r !== rating.toString())
        : [...prevRatings, rating.toString()]
    );
    filterSpots();
  };

  const handleCustomerReviewChange = (event) => {
    const value = event.target.value;
    setCustomerReviews((prevReviews) =>
      prevReviews.includes(value)
        ? prevReviews.filter((r) => r !== value)
        : [...prevReviews, value]
    );
    filterSpots();
  };

  const handlePriceRangeChange = (newValue) => {
    setPriceRange(newValue);
    filterSpots();
  };

  const handleCategoryChange = (category) => {
    setFoodCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
    filterSpots();
  };

  const handleMealTimeChange = (mealTime) => {
    setMealTimes((prevMealTimes) =>
      prevMealTimes.includes(mealTime)
        ? prevMealTimes.filter((m) => m !== mealTime)
        : [...prevMealTimes, mealTime]
    );
    filterSpots();
  };

  const filterSpots = () => {
    const filtered = foodSpots.filter((spot) => {
      const matchesRating =
        foodRatings.length === 0 ||
        foodRatings.includes(spot.rating.toString());
      const matchesReview =
        customerReviews.length === 0 ||
        customerReviews.includes(spot.rating.toString());
      const matchesPrice =
        spot.price >= priceRange[0] && spot.price <= priceRange[1];
      const matchesCategory =
        foodCategories.length === 0 || foodCategories.includes(spot.category);
      const matchesMealTime =
        mealTimes.length === 0 || mealTimes.includes(spot.mealTime);
      return (
        matchesRating &&
        matchesReview &&
        matchesPrice &&
        matchesCategory &&
        matchesMealTime
      );
    });
    setFilteredSpots(filtered);
    calculateAvgPrice(filtered);
  };

  const handleMapMove = () => {
    if (mapRef.current) {
      const newCenter = mapRef.current.getMap().getCenter();
      fetchFoodSpotsForLocation(newCenter.lng, newCenter.lat);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <div className="w-full md:w-1/3 p-4 overflow-y-auto bg-white shadow-lg">
        <h1 className="text-3xl font-bold text-orange-500 mb-6">
          🍽️ Find Your Perfect Meal
        </h1>
        <p className="text-gray-600 mb-4">
          Discover delicious dining options for your trip. Use the filters below
          to find your ideal meal.
        </p>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Meal Time 🕒</h2>
          <div className="flex flex-wrap gap-2">
            {mealTimeOptions.map((time) => (
              <button
                key={time.name}
                className={`py-1 px-3 rounded-full text-sm flex items-center ${
                  mealTimes.includes(time.name)
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => handleMealTimeChange(time.name)}
              >
                <time.icon className="mr-1" /> {time.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Cuisine Type 🍲</h2>
          <div className="flex flex-wrap gap-2">
            {cuisineTypes.map((type) => (
              <button
                key={type.name}
                className={`py-1 px-3 rounded-full text-sm flex items-center ${
                  foodCategories.includes(type.name)
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => handleCategoryChange(type.name)}
              >
                <type.icon className="mr-1" /> {type.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Search Radius 🔍</h2>
          <Slider
            min={500}
            max={5000}
            step={100}
            value={radius}
            onChange={handleRadiusChange}
          />
          <p className="mt-2 text-sm text-gray-600">
            Radius: {radius / 1000} km
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Price Range 💰</h2>
          <Slider
            range
            min={0}
            max={2000}
            step={100}
            value={priceRange}
            onChange={handlePriceRangeChange}
          />
          <p className="mt-2 text-sm text-gray-600">
            Price: ₹{priceRange[0]} - ₹{priceRange[1]}
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Customer Reviews ⭐</h2>
          <div className="flex flex-col gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <label key={star} className="flex items-center">
                <input
                  type="checkbox"
                  value={star.toString()}
                  onChange={handleCustomerReviewChange}
                  className="mr-2"
                />
                {[...Array(star)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-gray-700">{star} Star</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <button
            className="py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            onClick={handleContinueWithoutFood}
          >
            Continue Without Food 🚫🍽️
          </button>
          <button
            className="py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            onClick={handleContinue}
          >
            Continue with{" "}
            {selectedSpot ? selectedSpot.name : "Selected Food Spot"} 🍽️
          </button>
        </div>
      </div>

      <div className="w-full md:w-2/3 h-full relative">
        <Map
          ref={mapRef}
          {...viewport}
          onMove={(evt) => {
            setViewport(evt.viewState);
            handleMapMove();
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={mapboxgl.accessToken}
        >
          {filteredSpots.map((spot) => (
            <Marker
              key={spot.id}
              latitude={spot.location[1]}
              longitude={spot.location[0]}
            >
              <button
                className="marker-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setPopupInfo(spot);
                }}
              >
                <div className="bg-white rounded-full p-2 shadow-lg">
                  <FaMapMarkerAlt className="text-orange-500" />
                  <span className="text-xs font-bold text-black">
                    ₹{spot.price}
                  </span>
                </div>
              </button>
            </Marker>
          ))}

          {popupInfo && (
            <Popup
              anchor="top"
              latitude={popupInfo.location[1]}
              longitude={popupInfo.location[0]}
              onClose={() => setPopupInfo(null)}
            >
              <div className="p-2 max-w-xs">
                <h3 className="font-bold">{popupInfo.name}</h3>
                <p className="text-sm">{popupInfo.address}</p>
                <p className="text-sm">Price: ₹{popupInfo.price}</p>
                <p className="text-sm">Rating: {popupInfo.rating} ⭐</p>
                <p className="text-sm">Category: {popupInfo.category}</p>
                <p className="text-sm">Meal Time: {popupInfo.mealTime}</p>
                <button
                  className="mt-2 bg-orange-500 text-white px-2 py-1 rounded text-sm"
                  onClick={() => handleSpotSelect(popupInfo)}
                >
                  Select Food Spot
                </button>
              </div>
            </Popup>
          )}
        </Map>
        <div className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-md">
          <p className="text-sm font-semibold">Average Price: ₹{avgPrice}</p>
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-white p-4 overflow-x-auto">
          <div className="flex space-x-4">
            {filteredSpots.map((spot) => (
              <div
                key={spot.id}
                className="flex-shrink-0 w-48 border border-gray-300 rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition-shadow"
                onClick={() => handleSpotSelect(spot)}
              >
                <img
                  src={spot.image}
                  alt={spot.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-2">
                  <h4 className="font-semibold text-sm">{spot.name}</h4>
                  <p className="text-xs text-black">₹{spot.price}</p>
                  <p className="text-xs">{spot.rating} ⭐</p>
                  <p className="text-xs text-gray-600">{spot.category}</p>
                  <p className="text-xs text-gray-600">{spot.mealTime}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedSpot && (
        <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="font-bold text-lg mb-2">Selected Food Spot 🍽️</h3>
          <p className="text-sm">
            <strong>{selectedSpot.name}</strong>
          </p>
          <p className="text-sm">₹{selectedSpot.price} per meal</p>
          <p className="text-sm">{selectedSpot.rating} ⭐</p>
          <p className="text-sm text-gray-600">{selectedSpot.category}</p>
          <p className="text-sm text-gray-600">{selectedSpot.mealTime}</p>
        </div>
      )}
    </div>
  );
};

export default AiFood;
