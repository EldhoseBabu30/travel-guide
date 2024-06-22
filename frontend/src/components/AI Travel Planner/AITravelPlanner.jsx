import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AITravelPlanner = () => {
  const [formData, setFormData] = useState({
    destination: '',
    dates: '',
    activities: [],
    people: 1,
    travelWith: '',
  });
  const [destinations, setDestinations] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // Mock data for cities in India
  const citiesInIndia = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Hyderabad',
    'Ahmedabad',
    'Chennai',
    'Kolkata',
    'Surat',
    'Pune',
    'Jaipur',
    // Add more cities as needed
  ];

  // Function to filter cities based on user input
  const filterCities = (inputValue) => {
    return citiesInIndia.filter((city) =>
      city.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleActivityChange = (activity) => {
    setFormData((prevFormData) => {
      const newActivities = prevFormData.activities.includes(activity)
        ? prevFormData.activities.filter((act) => act !== activity)
        : [...prevFormData.activities, activity];
      return { ...prevFormData, activities: newActivities };
    });
  };

  const handleDestinationChange = (index, value) => {
    const newDestinations = [...destinations];
    newDestinations[index] = value;
    setDestinations(newDestinations);
    setFormData({ ...formData, destination: newDestinations.join(', ') });

    // Update state with filtered suggestions
    setSuggestions(filterCities(value));
  };

  const handleSuggestionClick = (index, suggestion) => {
    const newDestinations = [...destinations];
    newDestinations[index] = suggestion;
    setDestinations(newDestinations);
    setFormData({ ...formData, destination: newDestinations.join(', ') });
    setSuggestions([]);
  };

  const addDestination = () => {
    setDestinations([...destinations, '']);
  };

  const removeDestination = (index) => {
    const newDestinations = destinations.filter((_, i) => i !== index);
    setDestinations(newDestinations);
    setFormData({ ...formData, destination: newDestinations.join(', ') });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post('http://localhost:3000/api/plan', formData, {
        withCredentials: true,
      });

      navigate('/plan', { state: { travelPlan: res.data } });
    } catch (err) {
      console.error('Error details:', err);
      setError('Failed to generate travel plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center mt-12">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">AI Travel Planner</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            {destinations.map((destination, index) => (
              <div key={index} className="relative flex items-center mb-4">
                <input
                  type="text"
                  placeholder="Select a city"
                  value={destination}
                  onChange={(e) => handleDestinationChange(index, e.target.value)}
                  className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => removeDestination(index)}
                    className="ml-2 text-red-500"
                  >
                    &times;
                  </button>
                )}
                {/* Display suggestions */}
                {index === 0 && suggestions.length > 0 && (
                  <ul className="absolute bg-white border rounded-md shadow-md mt-1 w-full left-0 z-10">
                    {suggestions.map((suggestion, idx) => (
                      <li
                        key={idx}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => handleSuggestionClick(index, suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addDestination}
              className="text-blue-500 hover:text-blue-700 transition duration-200"
            >
              + Add destination
            </button>
          </div>
          <div className="mb-6">
            <label htmlFor="dates" className="block text-gray-700 font-medium mb-2">
              Select Dates
            </label>
            <input
              type="date"
              id="dates"
              name="dates"
              value={formData.dates}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Select Activities</label>
            <div className="flex flex-wrap">
              {['Kid Friendly', 'Museums', 'Shopping', 'Historical', 'Outdoor Adventures', 'Art & Cultural', 'Amusement Parks'].map((activity) => (
                <button
                  type="button"
                  key={activity}
                  className={`px-4 py-2 m-1 border rounded-md shadow-sm transition duration-200 ${formData.activities.includes(activity) ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                  onClick={() => handleActivityChange(activity)}
                >
                  {activity}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="people" className="block text-gray-700 font-medium mb-2">
              How Many People
            </label>
            <input
              type="number"
              id="people"
              name="people"
              value={formData.people}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Who is Traveling with You?</label>
            <div className="flex">
              {['Couple', 'Friends', 'Family'].map((option) => (
                <button
                  type="button"
                  key={option}
                  className={`px-4 py-2 m-1 border rounded-md shadow-sm transition duration-200 ${formData.travelWith === option ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                  onClick={() => setFormData({ ...formData, travelWith: option })}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Planning...' : 'Plan My Trip'}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default AITravelPlanner;
