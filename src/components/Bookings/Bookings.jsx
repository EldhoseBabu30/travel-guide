import React, { useState } from 'react';
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import conoor from '../../assets/conoor.jpg';
import ekm from '../../assets/ekm.jpg';
import kodai from '../../assets/kodaikanal.jpg';
import varkala from '../../assets/varkala_cliff.jpg';
import wayanad from '../../assets/wayanad.jpg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

  const stays = [
    {
      id: 1,
      image: conoor,
      name: 'Conoor',
      price: 2000,
      type: 'Entire homes',
      available: true,
      pool: true,
      jungleRooms: false,
    },
    {
      id: 2,
      image: ekm,
      name: 'Ernakulam',
      price: 500,
      type: 'Dormitory',
      available: true,
      pool: false,
      jungleRooms: false,
    },
    {
      id: 3,
      image: varkala,
      name: 'Varkala',
      price: 7000,
      type: 'Closest beach',
      available: true,
      pool: true,
      jungleRooms: true,
    },
    {
      id: 4,
      image: wayanad,
      name: 'Wayanad',
      price: 8000,
      type: 'Resorts',
      available: false,
      pool: true,
      jungleRooms: false,
    },
    {
      id: 5,
      image: kodai,
      name: 'Kodaikanal',
      price: 70000,
      type: 'Home Stay',
      available: true,
      pool: false,
      jungleRooms: true,
    },
  ];

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

  const filteredStays = stays.filter(
    (stay) =>
      (selectedTab === 'Entire homes' || stay.type === selectedTab) &&
      (filters.priceRange ? stay.price <= parseInt(filters.priceRange) : true) &&
      (!filters.available || stay.available) &&
      (!filters.pool || stay.pool) &&
      (!filters.jungleRooms || stay.jungleRooms)
  );

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

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Places to <span className="text-orange-400">Stay</span>
        </h1>
        <div className="flex flex-col items-center mt-2 space-y-4">
          <div className="flex flex-col md:flex-row flex-wrap justify-center md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <label className="text-gray-600">Check-in</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="block px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-gray-600">Check-out</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                className="block px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-gray-600">Guests</label>
              <select
                value={numAdults}
                onChange={(e) => setNumAdults(parseInt(e.target.value))}
                className="block px-4 py-2 border border-gray-300 rounded-md shadow-sm"
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
                className={`flex-1 py-2 px-4 rounded-full text-center ${
                  selectedTab === tab ? 'bg-orange-400 text-white' : 'bg-white text-gray-700'
                }`}
                onClick={() => setSelectedTab(tab)}
                style={{ padding: '8px 16px', flex: '1 0 auto' }} // Ensuring consistent padding and flexible sizing
              >
                {tab}
              </button>
            ))}
            <button
              className="py-2 px-4 bg-white text-gray-700 rounded-full border border-gray-300"
              onClick={() => setIsAdvancedFilterOpen(!isAdvancedFilterOpen)}
              style={{ padding: '8px 16px', flex: '1 0 auto' }} // Ensuring consistent padding and flexible sizing
            >
              Advanced filter
            </button>
          </div>
        </div>

        {isAdvancedFilterOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 shadow-lg relative w-full max-w-lg m-4">
              <h2 className="text-2xl font-bold mb-4">Advanced Filter</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700">Price Range</label>
                  <input
                    type="number"
                    name="priceRange"
                    value={filters.priceRange}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="Enter maximum price"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="available"
                    checked={filters.available}
                    onChange={handleFilterChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-gray-700">Available</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="pool"
                    checked={filters.pool}
                    onChange={handleFilterChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-gray-700">Pool</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="jungleRooms"
                    checked={filters.jungleRooms}
                    onChange={handleFilterChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-gray-700">Jungle Rooms</label>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  className="py-2 px-4 bg-gray-200 text-gray-700 rounded-full"
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
                className="absolute top-2 right-2 text-gray-600"
                onClick={() => setIsAdvancedFilterOpen(false)}
              >
                &times;
              </button>
            </div>
          </div>
        )}

        <div className="mt-10 flex justify-center items-center">
          <div className="w-full max-w-5xl">
            <Carousel
              responsive={responsive}
              infinite
              autoPlay
              showDots={filteredStays.length > 3}
              arrows={filteredStays.length > 3}
              className=''
            >
              {filteredStays.map((stay) => (
                <div key={stay.id} className="p-4">
                  <div className="relative bg-white rounded-lg overflow-hidden shadow-lg w-80 h-96 mx-auto">
                    <img className="w-full h-56 object-cover" src={stay.image} alt={stay.name} />
                    <div className="absolute top-4 right-4">
                      <button className="bg-white rounded-full p-2 shadow-md">
                        <svg
                          className="h-6 w-6 text-orange-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="p-4">
                      <h2 className="text-xl font-bold">{stay.name}</h2>
                      <p className="text-gray-600 mt-1">₦ {stay.price.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;