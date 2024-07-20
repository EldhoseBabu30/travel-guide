import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWJzaGFuIiwiYSI6ImNseHZ1ajUybTBtbGcyanF6eGFid216OHAifQ.1AXCW22VbJsmDC-2oIm0yw';

function SearchBar() {
  const [travelData, setTravelData] = useState({
    from: "",
    whereTo: "",
    transport: "",
    departureDate: null,
    returnDate: null,
    tripType: "One Way"
  });

  const fromGeocoderContainerRef = useRef(null);
  const toGeocoderContainerRef = useRef(null);
  const fromGeocoderRef = useRef(null);
  const toGeocoderRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (fromGeocoderContainerRef.current && !fromGeocoderRef.current) {
      fromGeocoderRef.current = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        placeholder: 'From',
        mapboxgl: mapboxgl,
        marker: false,
      });

      fromGeocoderRef.current.addTo(fromGeocoderContainerRef.current);

      fromGeocoderRef.current.on('result', (e) => {
        setTravelData({ ...travelData, from: e.result.place_name });
      });
    }

    if (toGeocoderContainerRef.current && !toGeocoderRef.current) {
      toGeocoderRef.current = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        placeholder: 'To',
        mapboxgl: mapboxgl,
        marker: false,
      });

      toGeocoderRef.current.addTo(toGeocoderContainerRef.current);

      toGeocoderRef.current.on('result', (e) => {
        setTravelData({ ...travelData, whereTo: e.result.place_name });
      });
    }

    // Style the Geocoder inputs
    const geocoderInputs = document.querySelectorAll('.mapboxgl-ctrl-geocoder--input');
    geocoderInputs.forEach(input => {
      input.classList.add(
        'w-full',
        'bg-white',
        'py-2.5',
        'border-none',
        'focus:outline-none',
        'focus:ring-0'
      );
    });

    // Remove Mapbox logo and adjust container styles
    const geocoderContainers = document.querySelectorAll('.mapboxgl-ctrl-geocoder');
    geocoderContainers.forEach(container => {
      container.style.boxShadow = 'none';
      container.style.border = 'none';
      container.style.borderRadius = '0';
      container.style.width = '100%';
      container.style.maxWidth = 'none';
      const logo = container.querySelector('.mapboxgl-ctrl-logo');
      if (logo) logo.remove();
    });
  }, []);

  const handleExplore = () => {
    navigate('/trip-details', { state: { travelData } });
  };

  const handleDateChange = (date, field) => {
    setTravelData(prev => ({
      ...prev,
      [field]: date,
      tripType: field === 'returnDate' && date ? 'Round Trip' : prev.tripType
    }));
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-4 md:p-6">
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded-full text-sm md:text-base ${travelData.tripType === 'One Way' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setTravelData({ ...travelData, tripType: 'One Way', returnDate: null })}
        >
          One Way
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm md:text-base ${travelData.tripType === 'Round Trip' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setTravelData({ ...travelData, tripType: 'Round Trip' })}
        >
          Round Trip
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="rounded-md border border-gray-300">
          <div ref={fromGeocoderContainerRef}></div>
        </div>
        <div className="rounded-md border border-gray-300">
          <div ref={toGeocoderContainerRef}></div>
        </div>
        <div>
          <select
            className="w-full bg-white rounded-md px-4 py-2.5 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            name="transport"
            onChange={(e) => { setTravelData({ ...travelData, transport: e.target.value }) }}
            value={travelData.transport}
            required
          >
            <option value="" hidden>Transport</option>
            <option>Flight</option>
            <option>Train</option>
            <option>Car Rental</option>
          </select>
        </div>
        <div>
          <DatePicker
            selected={travelData.departureDate}
            onChange={(date) => handleDateChange(date, 'departureDate')}
            selectsStart
            startDate={travelData.departureDate}
            endDate={travelData.returnDate}
            className="w-full bg-white rounded-md px-4 py-2.5 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholderText="Departure Date"
          />
        </div>
        <div>
          <DatePicker
            selected={travelData.returnDate}
            onChange={(date) => handleDateChange(date, 'returnDate')}
            selectsEnd
            startDate={travelData.departureDate}
            endDate={travelData.returnDate}
            minDate={travelData.departureDate}
            className="w-full bg-white rounded-md px-4 py-2.5 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholderText="Return Date"
            disabled={travelData.tripType === 'One Way'}
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleExplore}
          className="px-6 py-2.5 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors text-sm md:text-base"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;