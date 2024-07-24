import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaStar,
  FaBed,
  FaHome,
  FaHotel,
  FaWarehouse,
  FaUsers,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { TripContext } from "../AiTravel/context/TripContext";
import mapboxgl from "mapbox-gl";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

mapboxgl.accessToken = "pk.eyJ1IjoiYWJzaGFuIiwiYSI6ImNseHZ1ajUybTBtbGcyanF6eGFid216OHAifQ.1AXCW22VbJsmDC-2oIm0yw";

const AiHotel = () => {
  const { tripData, updateTripData } = useContext(TripContext);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [viewport, setViewport] = useState({
    latitude: tripData.destinationCoordinates[1],
    longitude: tripData.destinationCoordinates[0],
    zoom: 12,
  });
  const [popupInfo, setPopupInfo] = useState(null);
  const [radius, setRadius] = useState(2500);
  const [hotelRatings, setHotelRatings] = useState([]);
  const [customerReviews, setCustomerReviews] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [stayCategories, setStayCategories] = useState([]);
  const [avgPrice, setAvgPrice] = useState(0);
  const mapRef = useRef();
  const navigate = useNavigate();

  const stayTypes = [
    { name: "Hotel", icon: FaHotel },
    { name: "Homestay", icon: FaHome },
    { name: "Cottage", icon: FaWarehouse },
    { name: "Hostel", icon: FaUsers },
  ];

  useEffect(() => {
    fetchHotelsForLocation(
      tripData.destinationCoordinates[0],
      tripData.destinationCoordinates[1]
    );
  }, [tripData.destinationCoordinates, radius]);

  const fetchHotelsForLocation = async (lon, lat) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/hotel.json`,
        {
          params: {
            proximity: `${lon},${lat}`,
            limit: 20,
            types: 'poi',
            access_token: mapboxgl.accessToken,
          },
        }
      );

      const fetchedHotels = response.data.features.map((feature) => ({
        id: feature.id,
        name: feature.text,
        rating: Math.floor(Math.random() * 5) + 1,
        location: feature.center,
        price: Math.floor(Math.random() * 100) * 80 + 1000,
        image: `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${feature.center[0]},${feature.center[1]},15,0/300x200@2x?access_token=${mapboxgl.accessToken}`,
        address: feature.place_name,
        category: stayTypes[Math.floor(Math.random() * stayTypes.length)].name,
      }));

      setHotels(fetchedHotels);
      setFilteredHotels(fetchedHotels);
      calculateAvgPrice(fetchedHotels);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const calculateAvgPrice = (hotelList) => {
    const total = hotelList.reduce((sum, hotel) => sum + hotel.price, 0);
    setAvgPrice(Math.round(total / hotelList.length));
  };

  const handleHotelSelect = (hotel) => {
    setSelectedHotel(hotel);
    updateTripData({
      ...tripData,
      accommodation: {
        name: hotel.name,
        location: hotel.address,
        roomType: `${hotel.rating} Star`,
      },
    });
    setViewport({
      ...viewport,
      latitude: hotel.location[1],
      longitude: hotel.location[0],
      zoom: 14,
    });
    setPopupInfo(hotel);
  };

  const handleContinue = () => {
    if (!selectedHotel) {
      alert("Please select a hotel.");
    } else {
      navigate("/travelplanner/food");
    }
  };

  const handleContinueWithoutHotel = () => {
    navigate("/travelplanner/food");
  };

  const handleRadiusChange = (value) => {
    setRadius(value);
    setViewport({
      ...viewport,
      zoom: 12 - Math.log2(value / 1000),
    });
    filterHotels();
  };

  const handleHotelRatingChange = (rating) => {
    setHotelRatings((prevRatings) =>
      prevRatings.includes(rating)
        ? prevRatings.filter((r) => r !== rating)
        : [...prevRatings, rating]
    );
    filterHotels();
  };

  const handleCustomerReviewChange = (event) => {
    const value = event.target.value;
    setCustomerReviews((prevReviews) =>
      prevReviews.includes(value)
        ? prevReviews.filter((r) => r !== value)
        : [...prevReviews, value]
    );
    filterHotels();
  };

  const handlePriceRangeChange = (newValue) => {
    setPriceRange(newValue);
    filterHotels();
  };

  const handleCategoryChange = (category) => {
    setStayCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
    filterHotels();
  };

  const filterHotels = () => {
    const filtered = hotels.filter((hotel) => {
      const matchesRating =
        hotelRatings.length === 0 ||
        hotelRatings.includes(hotel.rating.toString());
      const matchesReview =
        customerReviews.length === 0 ||
        customerReviews.includes(hotel.rating.toString());
      const matchesPrice =
        hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
      const matchesCategory =
        stayCategories.length === 0 || stayCategories.includes(hotel.category);
      return matchesRating && matchesReview && matchesPrice && matchesCategory;
    });
    setFilteredHotels(filtered);
    calculateAvgPrice(filtered);
  };

  const handleMapMove = () => {
    if (mapRef.current) {
      const newCenter = mapRef.current.getMap().getCenter();
      fetchHotelsForLocation(newCenter.lng, newCenter.lat);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <div className="w-full md:w-1/3 p-4 overflow-y-auto bg-white shadow-lg">
        <h1 className="text-3xl font-bold text-orange-500 mb-6">
          🏨 Find Your Perfect Stay
        </h1>
        <p className="text-gray-600 mb-4">
          Discover comfortable and convenient accommodations for your trip. Use
          the filters below to find your ideal stay.
        </p>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Hotel Rating</h2>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`py-1 px-3 rounded-full text-sm ${
                  hotelRatings.includes(star.toString())
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => handleHotelRatingChange(star.toString())}
              >
                {star} ⭐
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Search Radius</h2>
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
          <h2 className="text-xl font-semibold mb-3">Price Range</h2>
          <Slider
            range
            min={0}
            max={10000}
            step={500}
            value={priceRange}
            onChange={handlePriceRangeChange}
          />
          <p className="mt-2 text-sm text-gray-600">
            Price: ₹{priceRange[0]} - ₹{priceRange[1]}
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Stay Category</h2>
          <div className="flex flex-wrap gap-2">
            {stayTypes.map((type) => (
              <button
                key={type.name}
                className={`py-1 px-3 rounded-full text-sm flex items-center ${
                  stayCategories.includes(type.name)
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
          <h2 className="text-xl font-semibold mb-3">Customer Reviews</h2>
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
            onClick={handleContinueWithoutHotel}
          >
            Continue Without Hotel
          </button>
          <button
            className="py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            onClick={handleContinue}
          >
            Continue with{" "}
            {selectedHotel ? selectedHotel.name : "Selected Hotel"}
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
          {filteredHotels.map((hotel) => (
            <Marker
              key={hotel.id}
              latitude={hotel.location[1]}
              longitude={hotel.location[0]}
            >
              <button
                className="marker-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setPopupInfo(hotel);
                }}
              >
                <div className="bg-white rounded-full p-2 shadow-lg">
                  <FaMapMarkerAlt className="text-orange-500" />
                  <span className="text-xs font-bold text-black">
                    ₹{hotel.price}
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
                <button
                  className="mt-2 bg-orange-500 text-white px-2 py-1 rounded text-sm"
                  onClick={() => handleHotelSelect(popupInfo)}
                >
                  Select Hotel
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
            {filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="flex-shrink-0 w-48 border border-gray-300 rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition-shadow"
                onClick={() => handleHotelSelect(hotel)}
              >
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-2">
                  <h4 className="font-semibold text-sm">{hotel.name}</h4>
                  <p className="text-xs text-black">₹{hotel.price}</p>
                  <p className="text-xs">{hotel.rating} ⭐</p>
                  <p className="text-xs text-gray-600">{hotel.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedHotel && (
        <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="font-bold text-lg mb-2">Selected Stay</h3>
          <p className="text-sm">
            <strong>{selectedHotel.name}</strong>
          </p>
          <p className="text-sm">₹{selectedHotel.price} per night</p>
          <p className="text-sm">{selectedHotel.rating} ⭐</p>
          <p className="text-sm text-gray-600">{selectedHotel.category}</p>
        </div>
      )}
    </div>
  );
};

export default AiHotel;