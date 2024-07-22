import React, { useState, useEffect, useRef } from 'react';
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { GoogleGenerativeAI } from '@google/generative-ai';
import styled, { keyframes } from 'styled-components';
import ReactDOM from 'react-dom';


mapboxgl.accessToken = 'pk.eyJ1IjoiYWJzaGFuIiwiYSI6ImNseHZ1ajUybTBtbGcyanF6eGFid216OHAifQ.1AXCW22VbJsmDC-2oIm0yw';
const genAI = new GoogleGenerativeAI("AIzaSyBcqgvhFPrI5WlRxVbRZpmqki34rbc0lq8");

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 107, 107, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 107, 107, 0);
  }
`;

const CustomMarker = styled.div`
  width: 30px;
  height: 30px;
  background-color: #ff6b6b;
  border: 2px solid #fff;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 0 rgba(255, 107, 107, 0.4);
  animation: ${pulse} 2s infinite;
`;

const App = () => {
  const [selectedTab, setSelectedTab] = useState('Entire homes');
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: '',
    available: false,
    pool: false,
    jungleRooms: false,
  });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numAdults, setNumAdults] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [stays, setStays] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPlace, setCurrentPlace] = useState('');

  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 2
    });
  }, []);

  useEffect(() => {
    if (map.current && currentPlace && stays[selectedTab]) {
      // Clear existing markers
      Object.values(markersRef.current).forEach(marker => marker.remove());
      markersRef.current = {};
  
      // Add new markers for each stay
      stays[selectedTab].forEach((stay) => {
        const el = document.createElement('div');
        ReactDOM.render(<CustomMarker />, el);
  
        const marker = new mapboxgl.Marker(el)
          .setLngLat([stay.lng || 0, stay.lat || 0])
          .addTo(map.current);
  
        // Add popup
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h3>${stay.name}</h3><p>Price: ₹${stay.price.toLocaleString()}</p>`
        );
  
        marker.setPopup(popup);
  
        markersRef.current[stay.id] = marker;
      });
    }
  }, [currentPlace, stays, selectedTab]);

  const handleStayClick = (stay) => {
    const marker = markersRef.current[stay.id];
    if (marker) {
      map.current.flyTo({
        center: marker.getLngLat(),
        zoom: 15
      });
      marker.togglePopup(); // This will open the popup
    }
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}&types=place`;
      const response = await fetch(endpoint);
      const data = await response.json();
      setSuggestions(data.features.map(feature => feature.place_name));
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = async (place) => {
    setSearchQuery(place);
    setSuggestions([]);
    setLoading(true);
    setCurrentPlace(place);

    // Update map location
    const geocodingEndpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?access_token=${mapboxgl.accessToken}`;
    const response = await fetch(geocodingEndpoint);
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      const [lng, lat] = data.features[0].center;
      map.current.flyTo({ center: [lng, lat], zoom: 10 });
    }

    // Fetch stays for each tab
    const tabs = ['Entire homes', 'Dormitory', 'Closest beach', 'Resorts', 'Home Stay'];
    const allStays = {};

    for (const tab of tabs) {
      try {
        const staysForTab = await fetchStaysForTab(place, tab);
        allStays[tab] = staysForTab;
      } catch (error) {
        console.error(`Error generating stays for ${tab}:`, error);
        allStays[tab] = [];
      }
    }

    setStays(allStays);
    setLoading(false);
  };

  const tabs = ['Entire homes', 'Dormitory', 'Closest beach', 'Resorts', 'Home Stay'];

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const applyFilters = () => {
    setIsAdvancedFilterOpen(false);
  };

  const filteredStays = stays[selectedTab] ? stays[selectedTab].filter(
    (stay) =>
      (filters.priceRange ? stay.price <= parseInt(filters.priceRange) : true) &&
      (!filters.available || stay.available) &&
      (!filters.pool || stay.pool) &&
      (!filters.jungleRooms || stay.jungleRooms)
  ) : [];

  const responsive = {
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
  };

  const fetchStaysForTab = async (place, tabType) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Generate 3 fictional stays in ${place} of type "${tabType}" with the following properties: name, price (in rupees), available (true/false), pool (true/false), jungleRooms (true/false), lng (longitude), lat (latitude). Format the response as a JSON array.`;

    try {
      const result = await model.generateContent(prompt);
      const generatedStays = JSON.parse(result.response.text());
      return generatedStays.map((stay, index) => ({
        ...stay,
        id: `${tabType}-${index + 1}`,
        type: tabType,
      }));
    } catch (error) {
      console.error(`Error generating stays for ${tabType}:`, error);
      return [];
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
          Places to <span className="text-orange-400">Stay</span>
        </h1>
        <div className="flex flex-col items-center mt-2 space-y-4">
          <div className="flex flex-col md:flex-row flex-wrap justify-center md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex flex-col items-center space-y-2 w-full md:w-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search for a place"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
              />
              {suggestions.length > 0 && (
                <ul className="bg-white dark:bg-gray-800 border border-gray-300 rounded-md shadow-sm w-full">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-gray-600 dark:text-gray-400">Check-in</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="block px-4 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-gray-600 dark:text-gray-400">Check-out</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                className="block px-4 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-gray-600 dark:text-gray-400">Guests</label>
              <select
                value={numAdults}
                onChange={(e) => setNumAdults(parseInt(e.target.value))}
                className="block px-4 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
              >
                {[...Array(10).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1} {num + 1 === 1 ? 'adult' : 'adults'}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap justify-center space-x-2 space-y-2 md:space-y-0 md:flex-nowrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`flex-1 py-2 px-4 rounded-full text-center ${selectedTab === tab ? 'bg-orange-400 text-white' : 'bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                onClick={() => setSelectedTab(tab)}
                style={{ padding: '8px 16px', flex: '1 0 auto' }}
              >
                {tab}
              </button>
            ))}
            <button
              className="py-2 px-4 bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-full border border-gray-300 dark:border-gray-600"
              onClick={() => setIsAdvancedFilterOpen(!isAdvancedFilterOpen)}
              style={{ padding: '8px 16px', flex: '1 0 auto' }}
            >
              Advanced filter
            </button>
          </div>
        </div>

        {isAdvancedFilterOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg relative w-full max-w-lg m-4">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Advanced Filter</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-400">Price Range</label>
                  <input
                    type="number"
                    name="priceRange"
                    value={filters.priceRange}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
                    placeholder="Enter maximum price"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="available"
                    checked={filters.available}
                    onChange={handleFilterChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded dark:bg-gray-700"
                  />
                  <label className="ml-2 block text-gray-700 dark:text-gray-400">Available</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="pool"
                    checked={filters.pool}
                    onChange={handleFilterChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded dark:bg-gray-700"
                  />
                  <label className="ml-2 block text-gray-700 dark:text-gray-400">Pool</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="jungleRooms"
                    checked={filters.jungleRooms}
                    onChange={handleFilterChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded dark:bg-gray-700"
                  />
                  <label className="ml-2 block text-gray-700 dark:text-gray-400">Jungle Rooms</label>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  className="py-2 px-4 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-full"
                  onClick={() => setIsAdvancedFilterOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="py-2 px-4 bg-blue-600 text-white rounded-full"
                  onClick={applyFilters}
                >
                  Apply Filters
                </button>
              </div>
              <button
                className="absolute top-2 right-2 text-gray-600 dark:text-gray-300"
                onClick={() => setIsAdvancedFilterOpen(false)}
              >
                &times;
              </button>
            </div>
          </div>
        )}

        <div className="mt-10 flex justify-center items-center">
          <div className="w-full max-w-5xl">
            {loading ? (
              <p className="text-center text-gray-600 dark:text-gray-400">Loading stays...</p>
            ) : currentPlace ? (
              filteredStays.length > 0 ? (
                <Carousel
                  responsive={responsive}
                  infinite
                  autoPlay
                  showDots={filteredStays.length > 3}
                  arrows={filteredStays.length > 3}
                  className=''
                >
                  {filteredStays.map((stay) => (
                    <div key={stay.id} className="p-4" onClick={() => handleStayClick(stay)}>
                      <div className="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg w-80 h-80 mx-auto cursor-pointer">
                        <div className="absolute top-4 right-4">
                          <button className="bg-white dark:bg-gray-700 rounded-full p-2 shadow-md">
                            <svg
                              className="h-6 w-6 text-orange-400"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12 21.35l-1.45-1.35C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                        <div className="p-4">
                          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{stay.name}</h2>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">₹ {stay.price.toLocaleString()}</p>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">{stay.type}</p>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {stay.available ? 'Available' : 'Not Available'}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {stay.pool ? 'Has Pool' : 'No Pool'}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {stay.jungleRooms ? 'Jungle Rooms' : 'No Jungle Rooms'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </Carousel>
              ) : (
                <p className="text-center text-gray-600 dark:text-gray-400">
                  No stays found for {selectedTab} in {currentPlace}.
                  {stays[selectedTab] && stays[selectedTab].length > 0 ?
                    "Try adjusting your filters." :
                    "Try selecting a different tab or searching for another place."}
                </p>
              )
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-400">Search for a place to see available stays.</p>
            )}
          </div>
        </div>
      </div>
      {/* Mapbox container */}
      <div ref={mapContainer} className="map-container" style={{ height: '300px', marginTop: '20px' }} />
    </div>
  );
};

export default App;