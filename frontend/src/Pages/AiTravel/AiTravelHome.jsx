import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { TripContext } from '../AiTravel/context/TripContext';
import video from '../../assets/banner-video.mp4';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWJzaGFuIiwiYSI6ImNseHZ1ajUybTBtbGcyanF6eGFid216OHAifQ.1AXCW22VbJsmDC-2oIm0yw';

const AiTravelHome = () => {
  const navigate = useNavigate();
  const { tripData, setTripData } = useContext(TripContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState('');
  const geocoderContainerRef = useRef(null);
  const geocoderRef = useRef(null); // Ref to store the geocoder instance
  const modalRef = useRef(null); // Ref to store the modal instance

  useEffect(() => {
    if (showModal && geocoderContainerRef.current) {
      if (geocoderRef.current) {
        geocoderRef.current.clear();
      }

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        types: 'place',
        placeholder: 'Search for your destination',
        mapboxgl: mapboxgl,
      });

      geocoderRef.current = geocoder; // Save geocoder instance to ref for cleanup

      geocoder.addTo(geocoderContainerRef.current);

      geocoder.on('result', (e) => {
        setSelectedDestination(e.result.place_name);
        setTripData({
          ...tripData,
          destination: e.result.place_name,
          destinationCoordinates: e.result.center,
        });
      });
    }

    return () => {
      if (geocoderRef.current) {
        geocoderRef.current.clear();
      }
    };
  }, [showModal, tripData, setTripData]);

  const handleSearch = () => {
    setShowModal(false);
    navigate('/traveller');
  };

  const handleCloseModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      window.addEventListener('mousedown', handleCloseModal);
    } else {
      window.removeEventListener('mousedown', handleCloseModal);
    }

    return () => {
      window.removeEventListener('mousedown', handleCloseModal);
    };
  }, [showModal]);

  return (
    <div className="relative w-full min-h-screen bg-cover bg-center">
      <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative flex flex-col items-center justify-center min-h-screen text-white text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Your Perfect Trip with Njansanchari’s AI Travel Planner</h1>
        <p className="text-lg md:text-xl mb-6">Personalized Itineraries, Seamless Booking, Budget-Friendly Options</p>
       
        <button 
          className="bg-orange-400 text-white text-lg font-semibold py-3 px-8 rounded-lg transition transform hover:scale-105"
          onClick={() => setShowModal(true)}
        >
          Create a New Trip
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
          <div ref={modalRef} className="relative bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 h-auto p-8 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-center mb-4 animate-bounce">🌍 Let's Plan Your Dream Trip! ✈️</h2>
            <div ref={geocoderContainerRef} className="w-full mb-4"></div>
            {selectedDestination && (
              <input 
                type="text" 
                value={selectedDestination} 
                readOnly 
                className="w-full text-center mb-4 border-2 border-gray-300 rounded-lg py-2 px-4"
              />
            )}
            <button 
              className="bg-orange-400 text-white text-lg font-semibold py-2 px-6 rounded-lg w-full transition transform hover:scale-105"
              onClick={handleSearch}
              disabled={!tripData.destination}
            >
              Start Planning 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiTravelHome;
