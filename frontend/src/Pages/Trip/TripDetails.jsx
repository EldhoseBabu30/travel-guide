import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyBtLgAkzdaEGVytlLaKlZvGW3LtYTeM8z8');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
        let options;
        switch (travelData.transport.toLowerCase()) {
          case 'flight':
            options = await fetchFlightOptions();
            break;
          case 'train':
            options = await fetchTrainOptions();
            break;
          case 'car rental':
            options = await fetchCarRentalOptions();
            break;
          default:
            throw new Error('Invalid transport type');
        }
        setTransportOptions(options);
        setLoading(false);
      } catch (err) {
        setError(`Failed to fetch ${travelData.transport} options: ${err.message}`);
        setLoading(false);
      }
    }
    fetchTransportOptions();
  }, [travelData]);

  async function fetchFlightOptions() {
    const url = 'https://sky-scanner3.p.rapidapi.com/flights/price-calendar-web?fromEntityId=YUL&toEntityId=ABJ&yearMonth=2024-07';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '74f47719e3msh147a59180c77326p1c07fdjsn879a4bc7ab76',
        'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com'
      }
    };
    const response = await fetch(url, options);
    const result = await response.json();
    return result.map(flight => ({
      company: flight.carrier.name,
      type: flight.direct ? 'Direct' : 'With stops',
      price: flight.price.amount,
      duration: `${Math.floor(flight.duration / 60)}h ${flight.duration % 60}m`,
      departureTime: new Date(flight.departureTime).toLocaleTimeString(),
      arrivalTime: new Date(flight.arrivalTime).toLocaleTimeString(),
      origin: flight.origin.iata,
      destination: flight.destination.iata,
      stops: flight.direct ? 0 : 1
    })).slice(0, 5);
  }

  async function fetchTrainOptions() {
    const url = 'https://irctc1.p.rapidapi.com/api/v3/getLiveStation?hours=1';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '74f47719e3msh147a59180c77326p1c07fdjsn879a4bc7ab76',
        'x-rapidapi-host': 'irctc1.p.rapidapi.com'
      }
    };
    const response = await fetch(url, options);
    const result = await response.json();
    return (result.data || []).slice(0, 5).map(train => ({
      company: 'Indian Railways',
      type: 'Train',
      price: 'N/A',
      duration: 'N/A',
      departureTime: train.scheduledDeparture,
      arrivalTime: 'N/A',
      origin: train.stationCode,
      destination: travelData.whereTo,
      stops: 'N/A'
    }));
  }

  async function fetchCarRentalOptions() {
    const url = 'https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotelsByCoordinates?latitude=19.24232736426361&longitude=72.85841985686734&adults=1&children_age=0%2C17&room_qty=1&units=metric&page_number=1&temperature_unit=c&languagecode=en-us&currency_code=EUR';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '74f47719e3msh147a59180c77326p1c07fdjsn879a4bc7ab76',
        'x-rapidapi-host': 'booking-com15.p.rapidapi.com'
      }
    };
    const response = await fetch(url, options);
    const result = await response.json();
    return (result.data || []).slice(0, 5).map(car => ({
      company: car.name,
      type: 'Car Rental',
      price: `${car.price_breakdown.gross_price} ${car.price_breakdown.currency}`,
      duration: 'N/A',
      departureTime: 'N/A',
      arrivalTime: 'N/A',
      origin: travelData.from,
      destination: travelData.whereTo,
      stops: 'N/A'
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