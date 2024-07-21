import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function TripDetails() {
  const [transportOptions, setTransportOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { travelData } = location.state || {};

  useEffect(() => {
    async function fetchTransportOptions() {
      if (!travelData) {
        setError('No travel data provided');
        setLoading(false);
        return;
      }
      try {
        const options = await fetchOptionsFromGemini(travelData);
        setTransportOptions(options);
        setLoading(false);
      } catch (err) {
        setError(`Failed to fetch ${travelData.transport} options: ${err.message}`);
        setLoading(false);
      }
    }
    fetchTransportOptions();
  }, [travelData]);

  async function fetchOptionsFromGemini(travelData) {
    // In a real application, this would be a backend API call
    const apiKey = 'AIzaSyBtLgAkzdaEGVytlLaKlZvGW3LtYTeM8z8'; // This should be kept secret in a real app
    const prompt = `Generate 5 ${travelData.transport} options from ${travelData.from} to ${travelData.whereTo} on ${travelData.departureDate}. Include company, type, price, duration, departure time, arrival time, and number of stops.`;

    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
        {
          contents: [{ parts: [{ text: prompt }] }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey,
          },
        }
      );

      // Parse the response and convert it to the expected format
      // This is a simplified example and would need to be adapted based on the actual Gemini API response
      const generatedText = response.data.candidates[0].content.parts[0].text;
      const options = parseGeneratedText(generatedText);
      return options;
    } catch (error) {
      console.error('Error fetching from Gemini API:', error);
      return [];
    }
  }

  function parseGeneratedText(text) {
    // This is a placeholder function. You would need to implement proper parsing
    // based on the actual format of the Gemini API response.
    const lines = text.split('\n');
    return lines.map((line, index) => ({
      company: `Company ${index + 1}`,
      type: travelData.transport,
      price: `$${Math.floor(Math.random() * 500) + 100}`,
      duration: `${Math.floor(Math.random() * 5) + 1}h ${Math.floor(Math.random() * 60)}m`,
      departureTime: '10:00 AM',
      arrivalTime: '2:00 PM',
      origin: travelData.from,
      destination: travelData.whereTo,
      stops: Math.floor(Math.random() * 3),
    }));
  }

  if (loading) {
    return <div className="text-center py-10">Loading {travelData?.transport} options...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Trip to {travelData?.whereTo}</h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4 bg-blue-900 text-white">
          <h2 className="text-xl font-semibold">
            Best {travelData?.transport} options from {travelData?.from} to {travelData?.whereTo}
          </h2>
          <p>
            {travelData?.departureDate?.toDateString()} {travelData?.returnDate && `- ${travelData.returnDate.toDateString()}`}
          </p>
        </div>
        <div className="divide-y divide-gray-200">
          {transportOptions.map((option, index) => (
            <div key={index} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold">{option.company.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{option.company}</p>
                    <p className="text-sm text-gray-600">{option.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg">{option.price}</p>
                  <p className="text-sm text-gray-600">{option.duration}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{option.departureTime}</p>
                  <p className="text-sm text-gray-600">{option.origin}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">{option.stops === 0 ? 'Direct' : `${option.stops} stop(s)`}</p>
                  <div className="w-32 h-1 bg-gray-300 my-2 relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-blue-500" style={{width: `${(parseInt(option.duration) / 24) * 100}%`}}></div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{option.arrivalTime}</p>
                  <p className="text-sm text-gray-600">{option.destination}</p>
                </div>
              </div>
              <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600 transition duration-300">
                Select
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TripDetails;