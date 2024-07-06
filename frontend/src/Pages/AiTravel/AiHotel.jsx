// src/components/AiHotel.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MapGL, { Marker, Popup } from 'react-map-gl';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';

const AiHotel = () => {
  const navigate = useNavigate();
  const [hotelRating, setHotelRating] = useState('');
  const [radius, setRadius] = useState(10);
  const [reviewRating, setReviewRating] = useState('');
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100%',
    height: 400,
    latitude: 40,
    longitude: -100,
    zoom: 3
  });

  useEffect(() => {
    if (hotelRating && radius && reviewRating) {
      fetchHotels();
    }
  }, [hotelRating, radius, reviewRating]);

  const fetchHotels = async () => {
    try {
      const response = await axios.get('/api/hotels', {
        params: {
          hotelRating,
          radius,
          reviewRating
        }
      });
      setHotels(response.data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  const handleContinue = () => {
    navigate('/ai-food');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex flex-1">
        <div className="w-1/3 p-4">
          <h2 className="text-xl font-bold mb-4">Select Hotel Star Rating</h2>
          {['1 star', '2 star', '3 star', '4 star', '5 star', '7 star'].map((rating) => (
            <button
              key={rating}
              className={`mb-2 p-2 w-full ${hotelRating === rating ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setHotelRating(rating)}
            >
              {rating}
            </button>
          ))}
          <h2 className="text-xl font-bold mb-4">Select Radius</h2>
          <input
            type="range"
            min="1"
            max="50"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            className="mb-4 w-full"
          />
          <h2 className="text-xl font-bold mb-4">Select Review Rating</h2>
          {[1, 2, 3, 4, 5].map((ratingValue) => (
            <button
              key={ratingValue}
              className={`mb-2 p-2 w-full ${reviewRating === ratingValue ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setReviewRating(ratingValue)}
            >
              {ratingValue} star
            </button>
          ))}
        </div>
        <div className="w-2/3 p-4">
          <MapGL
            {...viewport}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxApiAccessToken={'pk.eyJ1IjoiYWJzaGFuIiwiYSI6ImNseHZ1ajUybTBtbGcyanF6eGFid216OHAifQ.1AXCW22VbJsmDC-2oIm0yw'}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
          >
            {hotels.map((hotel) => (
              <Marker key={hotel.id} latitude={hotel.latitude} longitude={hotel.longitude}>
                <button
                  className="bg-red-500 rounded-full p-1"
                  onClick={() => setSelectedHotel(hotel)}
                >
                  <img src="/marker.svg" alt="Marker" />
                </button>
              </Marker>
            ))}
            {selectedHotel && (
              <Popup
                latitude={selectedHotel.latitude}
                longitude={selectedHotel.longitude}
                onClose={() => setSelectedHotel(null)}
                closeOnClick={false}
                offsetTop={-10}
              >
                <div>
                  <h2>{selectedHotel.name}</h2>
                  <p>{selectedHotel.description}</p>
                </div>
              </Popup>
            )}
          </MapGL>
          <div className="mt-4">
            <button
              onClick={handleContinue}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiHotel;
