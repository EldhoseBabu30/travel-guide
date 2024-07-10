// src/components/AiHotel.jsx
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import Map from './Map';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { TripContext } from '../AiTravel/context/TripContext';

const AiHotel = () => {
  const { tripData, setTripData } = useContext(TripContext);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [radius, setRadius] = useState(2500); // in meters
  const [hotelRatings, setHotelRatings] = useState([]);
  const [customerReviews, setCustomerReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/hotel.json`, {
        params: {
          proximity: '76.2711,10.8505',
          limit: 10,
          access_token: 'pk.eyJ1IjoiYWJzaGFuIiwiYSI6ImNseHZ1ajUybTBtbGcyanF6eGFid216OHAifQ.1AXCW22VbJsmDC-2oIm0yw',
        },
      });

      const fetchedHotels = response.data.features.map((feature, index) => ({
        id: feature.id,
        name: feature.text,
        rating: Math.floor(Math.random() * 5) + 1,
        location: feature.geometry.coordinates,
        price: Math.floor(Math.random() * 100) * 80 + 4000,
        image: `https://source.unsplash.com/200x200/?hotel,${index}`,
        address: feature.place_name,
      }));
      setHotels(fetchedHotels);
      setFilteredHotels(fetchedHotels); // Initialize filteredHotels with all hotels
    };
    fetchHotels();
  }, [radius]);

  const handleHotelSelect = (hotel) => {
    setSelectedHotel(hotel);
    setTripData({
      ...tripData,
      accommodation: { name: hotel.name, location: hotel.address, roomType: `${hotel.rating} Star` },
    });
  };

  const handleContinue = () => {
    if (!selectedHotel) {
      alert('Please select a hotel.');
    } else {
      navigate('/food');
    }
  };

  const handleContinueWithoutHotel = () => {
    navigate('/food');
  };

  const handleRadiusChange = (event) => {
    setRadius(event.target.value);
  };

  const handleHotelRatingChange = (rating) => {
    setHotelRatings((prevRatings) =>
      prevRatings.includes(rating) ? prevRatings.filter((r) => r !== rating) : [...prevRatings, rating]
    );
    filterHotels(hotels, rating, customerReviews);
  };

  const handleCustomerReviewChange = (event) => {
    const value = event.target.value;
    setCustomerReviews((prevReviews) =>
      prevReviews.includes(value) ? prevReviews.filter((r) => r !== value) : [...prevReviews, value]
    );
    filterHotels(hotels, hotelRatings, value);
  };

  const filterHotels = (allHotels, ratings, reviews) => {
    const filtered = allHotels.filter((hotel) => {
      const matchesRating = ratings.length === 0 || ratings.includes(hotel.rating.toString());
      const matchesReview = reviews.length === 0 || reviews.includes(hotel.rating.toString());
      return matchesRating && matchesReview;
    });
    setFilteredHotels(filtered);
  };

  const handleSearch = async (query) => {
    const response = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/hotel.json', {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-h-screen bg-white">
      <div className="p-4 col-span-1 md:col-span-1">
        <h1 className="text-4xl font-bold text-orange-500 mb-4">🏨 Select Your Stay 🏩</h1>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Select the Hotel</h2>
          <div className="flex flex-wrap gap-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`py-2 px-4 border ${hotelRatings.includes(star.toString()) ? 'bg-orange-500 text-white' : 'bg-white text-orange-500'} border-orange-500`}
                onClick={() => handleHotelRatingChange(star.toString())}
              >
                {star} ⭐ Hotel
              </button>
            ))}
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Search Hotels within the Radius</h2>
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
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Hotel Based on Customer Reviews</h2>
          <div className="flex flex-col gap-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <label key={star} className="flex items-center">
                <input
                  type="checkbox"
                  value={star.toString()}
                  onChange={handleCustomerReviewChange}
                  className="mr-2"
                />
                {[...Array(star)].map((_, i) => (
                  <FaStar key={i} color="gold" />
                ))}
                <span className="ml-2">{star} Star</span>
              </label>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-4">
          <button className="py-2 px-4 bg-orange-500 text-white" onClick={handleContinueWithoutHotel}>
            Continue Without Hotel
          </button>
          <button className="py-2 px-4 bg-orange-500 text-white" onClick={handleContinue}>
            Continue
          </button>
        </div>
        {selectedHotel && (
          <div className="mt-8 p-4 border border-gray-300 rounded-lg">
            <h4 className="text-xl font-semibold">{selectedHotel.name}</h4>
            <p className="mt-2">Address: {selectedHotel.address}</p>
            <p>Price: ₹{selectedHotel.price}</p>
            <p>Rating: {selectedHotel.rating} ⭐</p>
            <img src={selectedHotel.image} alt={selectedHotel.name} className="mt-4 w-full h-auto" />
          </div>
        )}
      </div>
      <div className="col-span-2 relative">
        <input
          type="text"
          placeholder="Search for hotels"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(e.target.value);
            }
          }}
          className="absolute top-4 left-4 z-10 w-72 p-2 border border-gray-300 rounded-lg"
        />
        <Map
          hotels={filteredHotels} // Use filteredHotels instead of hotels
          searchResults={searchResults}
          onHotelSelect={handleHotelSelect}
          selectedHotel={selectedHotel}
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
            {filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="border border-gray-300 rounded-lg overflow-hidden cursor-pointer m-2"
                onClick={() => handleHotelSelect(hotel)}
              >
                <img src={hotel.image} alt={hotel.name} className="w-full h-auto" />
                <div className="p-4">
                  <h4 className="text-lg font-semibold">{hotel.name}</h4>
                  <p className="mt-2">Price: ₹{hotel.price}</p>
                  <p>Rating: {hotel.rating}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default AiHotel;
