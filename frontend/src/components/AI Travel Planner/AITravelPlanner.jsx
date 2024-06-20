import React, { useState } from 'react';
import axios from 'axios';

const TravelPlanner = () => {
  const [formData, setFormData] = useState({
    destination: '',
    dates: '',
    activities: [],
    people: 1,
    travelWith: '',
  });
  const [destinations, setDestinations] = useState(['']); // To handle multiple destinations
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      const res = await axios.post('http://localhost:3000/api/travel-planner', formData, {
        withCredentials: true,
      });
      setResponse(res.data);
    } catch (err) {
      console.error('Error details:', err); // Log the error details
      setError('Failed to fetch travel plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">AI Travel Planner</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {destinations.map((destination, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  placeholder="Select a city"
                  value={destination}
                  onChange={(e) => handleDestinationChange(index, e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
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
              </div>
            ))}
            <button
              type="button"
              onClick={addDestination}
              className="text-blue-500"
            >
              + Add destination
            </button>
          </div>
          <div className="mb-4">
            <label htmlFor="dates" className="block text-gray-700 font-medium mb-2">
              Select Dates
            </label>
            <input
              type="date"
              id="dates"
              name="dates"
              value={formData.dates}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Select Activities</label>
            <div className="flex flex-wrap">
              {['Kid Friendly', 'Museums', 'Shopping', 'Historical', 'Outdoor Adventures', 'Art & Cultural', 'Amusement Parks'].map((activity) => (
                <button
                  type="button"
                  key={activity}
                  className={`px-3 py-2 m-1 border rounded-md ${formData.activities.includes(activity) ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => handleActivityChange(activity)}
                >
                  {activity}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="people" className="block text-gray-700 font-medium mb-2">
              How Many People
            </label>
            <input
              type="number"
              id="people"
              name="people"
              value={formData.people}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              min="1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Who is Traveling with You?</label>
            <div className="flex">
              {['Couple', 'Friends', 'Family'].map((option) => (
                <button
                  type="button"
                  key={option}
                  className={`px-3 py-2 m-1 border rounded-md ${formData.travelWith === option ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => setFormData({ ...formData, travelWith: option })}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Planning...' : 'Plan My Trip'}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {response && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Your Travel Plan</h2>
            <pre className="mt-4 p-4 bg-gray-100 rounded">{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelPlanner;
