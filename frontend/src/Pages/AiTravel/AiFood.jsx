// src/components/AiFood.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MapGL, { Marker, Popup } from 'react-map-gl';
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';

const AiFood = () => {
  const navigate = useNavigate();
  const [foodType, setFoodType] = useState('');
  const [radius, setRadius] = useState(10);
  const [rating, setRating] = useState('');
  const [foodPlaces, setFoodPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [viewport, setViewport] = useState({
    width: '100%',
    height: 400,
    latitude: 40,
    longitude: -100,
    zoom: 3
  });

  useEffect(() => {
    if (foodType && radius && rating) {
      fetchFoodPlaces();
    }
  }, [foodType, radius, rating]);

  const fetchFoodPlaces = async () => {
    try {
      const response = await axios.get('/api/food-places', {
        params: {
          foodType,
          radius,
          rating
        }
      });
      setFoodPlaces(response.data);
    } catch (error) {
      console.error('Error fetching food places:', error);
    }
  };

  const handleFinalize = () => {
    navigate('/ai-finalize');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-2xl font-bold">AI Food Finder</h1>
        <nav>
          <button onClick={() => navigate('/login')} className="mr-4">Login</button>
          <button onClick={() => navigate('/signup')}>Sign Up</button>
        </nav>
      </header>
      <div className="flex flex-1">
        <div className="w-1/3 p-4">
          <h2 className="text-xl font-bold mb-4">Select Your Food</h2>
          {['Indian', 'Italian', 'Chinese', 'Japanese', 'Mexican', 'Veg', 'Non-Veg'].map((type) => (
            <button
              key={type}
              className={`mb-2 p-2 w-full ${foodType === type ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setFoodType(type)}
            >
              {type}
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
          <h2 className="text-xl font-bold mb-4">Select Rating</h2>
          {[1, 2, 3, 4, 5].map((ratingValue) => (
            <button
              key={ratingValue}
              className={`mb-2 p-2 w-full ${rating === ratingValue ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setRating(ratingValue)}
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
            {foodPlaces.map((place) => (
              <Marker key={place.id} latitude={place.latitude} longitude={place.longitude}>
                <button
                  className="bg-red-500 rounded-full p-1"
                  onClick={() => setSelectedPlace(place)}
                >
                  <img src="/marker.svg" alt="Marker" />
                </button>
              </Marker>
            ))}
            {selectedPlace && (
              <Popup
                latitude={selectedPlace.latitude}
                longitude={selectedPlace.longitude}
                onClose={() => setSelectedPlace(null)}
                closeOnClick={false}
                offsetTop={-10}
              >
                <div>
                  <h2>{selectedPlace.name}</h2>
                  <p>{selectedPlace.description}</p>
                </div>
              </Popup>
            )}
          </MapGL>
          <div className="mt-4">
            <button
              onClick={handleFinalize}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Finalize
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiFood;