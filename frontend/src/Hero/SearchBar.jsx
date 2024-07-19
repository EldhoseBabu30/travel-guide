import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

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
        'rounded-full',
        'pl-10',
        'py-2.5',
        'shadow-md',
        'border',
        'border-gray-300',
        'focus:outline-none',
        'focus:ring-1',
        'focus:ring-indigo-500'
      );
      input.style.paddingLeft = '2.5rem';
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
    <div className="flex flex-col items-center w-full p-4 space-y-4">
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded-full ${travelData.tripType === 'One Way' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setTravelData({ ...travelData, tripType: 'One Way', returnDate: null })}
        >
          One Way
        </button>
        <button
          className={`px-4 py-2 rounded-full ${travelData.tripType === 'Round Trip' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setTravelData({ ...travelData, tripType: 'Round Trip' })}
        >
          Round Trip
        </button>
      </div>
      <div className="w-full max-w-4xl bg-white shadow-lg p-4 flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 rounded-lg">
        <div className="flex-grow rounded-full" ref={fromGeocoderContainerRef}></div>
        <div className="flex-grow rounded-full" ref={toGeocoderContainerRef}></div>
        <div className="flex-grow">
          <select
            className="w-full bg-white rounded-full px-4 py-2.5 shadow-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
        <div className="flex-grow">
          <DatePicker
            selected={travelData.departureDate}
            onChange={(date) => handleDateChange(date, 'departureDate')}
            selectsStart
            startDate={travelData.departureDate}
            endDate={travelData.returnDate}
            className="w-full bg-white rounded-full px-4 py-2.5 shadow-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholderText="Departure Date"
          />
        </div>
        {travelData.tripType === 'Round Trip' && (
          <div className="flex-grow">
            <DatePicker
              selected={travelData.returnDate}
              onChange={(date) => handleDateChange(date, 'returnDate')}
              selectsEnd
              startDate={travelData.departureDate}
              endDate={travelData.returnDate}
              minDate={travelData.departureDate}
              className="w-full bg-white rounded-full px-4 py-2.5 shadow-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholderText="Return Date"
            />
          </div>
        )}
        <div className="w-full lg:w-auto flex justify-center lg:justify-end">
          <button
            type="button"
            onClick={handleExplore}
            className="w-full lg:w-auto rounded-full border border-orange-400 bg-orange-400 py-2 px-4 text-white transition-all hover:bg-white hover:text-orange-400 text-center text-sm font-inter flex items-center justify-center"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;