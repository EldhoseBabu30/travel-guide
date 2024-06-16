import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Slider from 'rc-slider';
import 'tailwindcss/tailwind.css';
import 'rc-slider/assets/index.css';

const hotels = [
  {
    id: 1,
    name: "Metro Regency",
    rating: 3.9,
    price: 1146,
    star: "2-star hotel",
    address: "Some address in Tirur",
    facilities: "Free WiFi, Air-conditioned, Breakfast",
    location: { lat: 10.973, lng: 76.200 },
    image: 'https://via.placeholder.com/100?text=Metro+Regency',
  },
  {
    id: 2,
    name: "Regal Residency",
    rating: 4.0,
    price: 1157,
    star: "Hotel",
    address: "Some address in Tirur",
    facilities: "WiFi, Free WiFi",
    location: { lat: 10.974, lng: 76.201 },
    image: 'https://via.placeholder.com/100?text=Regal+Residency',
  },
  {
    id: 3,
    name: "Hi-TON Hotel",
    rating: 3.8,
    price: 1549,
    star: "3-star hotel",
    address: "Some address in Tirur",
    facilities: "Modern lodging with a restaurant",
    location: { lat: 10.975, lng: 76.202 },
    image: 'https://via.placeholder.com/100?text=Hi-TON+Hotel',
  },
  // Add more hotels here
];

const mapContainerStyle = {
  height: "100vh",
  width: "100%",
};

const center = {
  lat: 10.9743763,
  lng: 76.2003748,
};

const marks = {
  0: '₹0',
  2500: '₹2500',
  5000: '₹5000',
  7500: '₹7500',
  10000: '₹10000'
};

const HotelMap = () => {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [filters, setFilters] = useState({
    rating: null,
    star: null,
    facilities: [],
  });
  const mapRef = useRef();

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterHotels = (hotel) => {
    const price = hotel.price;
    const nameMatch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase());
    const priceMatch = price >= priceRange[0] && price <= priceRange[1];
    const ratingMatch = filters.rating ? hotel.rating >= filters.rating : true;
    const starMatch = filters.star ? hotel.star === filters.star : true;
    const facilitiesMatch = filters.facilities.length
      ? filters.facilities.every(facility => hotel.facilities.includes(facility))
      : true;
    return nameMatch && priceMatch && ratingMatch && starMatch && facilitiesMatch;
  };

  const sortedHotels = hotels.filter(filterHotels);

  const nextHotel = () => {
    if (!selectedHotel) return;
    const currentIndex = sortedHotels.findIndex(hotel => hotel.id === selectedHotel.id);
    const nextIndex = (currentIndex + 1) % sortedHotels.length;
    setSelectedHotel(sortedHotels[nextIndex]);
  };

  const prevHotel = () => {
    if (!selectedHotel) return;
    const currentIndex = sortedHotels.findIndex(hotel => hotel.id === selectedHotel.id);
    const prevIndex = (currentIndex - 1 + sortedHotels.length) % sortedHotels.length;
    setSelectedHotel(sortedHotels[prevIndex]);
  };

  useEffect(() => {
    if (selectedHotel) {
      mapRef.current.panTo(selectedHotel.location);
    }
  }, [selectedHotel]);

  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value,
    });
  };

  const handleFacilitiesChange = (facility) => {
    setFilters({
      ...filters,
      facilities: filters.facilities.includes(facility)
        ? filters.facilities.filter(f => f !== facility)
        : [...filters.facilities, facility],
    });
  };

  return (
    <div className="flex pt-28 justify-center">
      <div className="w-1/3 p-4 bg-white shadow-lg rounded-lg border border-gray-300 relative">
        <input
          type="text"
          placeholder="Search Property Name"
          className="w-full p-2 border rounded mb-4"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button
          className="p-2 mb-4 bg-blue-500 text-white rounded w-20"
          onClick={() => setShowFilterOptions(!showFilterOptions)}
        >
          Filter
        </button>
        {showFilterOptions && (
          <div className="absolute top-20 left-0 bg-white p-6 rounded-lg shadow-lg w-full z-10">
            <h3 className="text-lg font-bold mb-4">Filter Options</h3>
            <div className="mb-4">
              <label className="block">Minimum Rating</label>
              <Slider
                min={0}
                max={5}
                step={0.1}
                value={filters.rating || 0}
                onChange={(value) => handleFilterChange('rating', value)}
                marks={{ 0: '0', 5: '5' }}
                className="w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block">Star Category</label>
              <select
                className="w-full p-2 border rounded"
                value={filters.star || ''}
                onChange={(e) => handleFilterChange('star', e.target.value)}
              >
                <option value="">All</option>
                <option value="2-star hotel">2-star hotel</option>
                <option value="3-star hotel">3-star hotel</option>
                <option value="Hotel">Hotel</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block">Facilities</label>
              <div className="space-y-2">
                {['Free WiFi', 'Air-conditioned', 'Breakfast', 'WiFi'].map((facility) => (
                  <label key={facility} className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={filters.facilities.includes(facility)}
                      onChange={() => handleFacilitiesChange(facility)}
                    />
                    {facility}
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block">Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}</label>
              <Slider
                min={0}
                max={10000}
                value={priceRange}
                onChange={handlePriceChange}
                marks={marks}
                className="w-full"
              />
            </div>
            <button
              className="p-2 bg-blue-500 text-white rounded w-full"
              onClick={() => setShowFilterOptions(false)}
            >
              Apply Filters
            </button>
          </div>
        )}
        <div>
          {sortedHotels.map(hotel => (
            <div
              key={hotel.id}
              className={`p-4 mb-4 border rounded shadow ${selectedHotel?.id === hotel.id ? 'bg-gray-200' : 'hover:bg-gray-100 cursor-pointer'}`}
              onClick={() => setSelectedHotel(hotel)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold">{hotel.name}</h2>
                  <p>Rating: {hotel.rating} ⭐</p>
                  <p>{hotel.star}</p>
                  <p>Price: ₹{hotel.price}</p>
                  <p>Facilities: {hotel.facilities}</p>
                </div>
                <img src={hotel.image} alt={hotel.name} className="w-16 h-16 object-cover rounded ml-4" />
              </div>
            </div>
          ))}
          {sortedHotels.length === 0 && (
            <div className="p-4 mb-4 border rounded shadow text-center text-gray-600">
              No hotels found matching the criteria.
            </div>
          )}
        </div>
      </div>
      <div className="w-2/3 relative ml-4">
        <LoadScript googleMapsApiKey="AIzaSyC35NX4I4MICHrydn6-sJKA2tOYv6m2Bxc">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={14}
            onLoad={map => mapRef.current = map}
          >
            {sortedHotels.map(hotel => (
              <Marker
                key={hotel.id}
                position={hotel.location}
                onClick={() => setSelectedHotel(hotel)}
              />
            ))}
          </GoogleMap>
        </LoadScript>
        <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
          <button className="bg-white p-2 rounded" onClick={prevHotel}>‹</button>
        </div>
        <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
          <button className="bg-white p-2 rounded" onClick={nextHotel}>›</button>
        </div>
      </div>
    </div>
  );
};

export default HotelMap;
