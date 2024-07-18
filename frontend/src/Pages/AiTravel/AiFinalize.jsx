import React, { useContext, useEffect, useState, useRef } from 'react';
import { TripContext } from './context/TripContext';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { GoogleGenerativeAI } from "@google/generative-ai";

mapboxgl.accessToken = 'pk.eyJ1IjoiYWJzaGFuIiwiYSI6ImNseHZ1ajUybTBtbGcyanF6eGFid216OHAifQ.1AXCW22VbJsmDC-2oIm0yw';
const API_KEY = "AIzaSyBtLgAkzdaEGVytlLaKlZvGW3LtYTeM8z8";
const genAI = new GoogleGenerativeAI(API_KEY);

const AiFinalize = () => {
  const { tripData } = useContext(TripContext);
  const [itineraryData, setItineraryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    const fetchItinerary = async () => {
      setLoading(true);
      setError(null);
      try {
        const prompt = createPrompt(tripData);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const rawResponse = await response.text();
        console.log("Raw response from AI:", rawResponse);

        const structuredData = parseResponse(rawResponse);

        console.log("Structured data after parsing:", structuredData);

        if (structuredData) {
          setItineraryData(structuredData);
        } else {
          throw new Error('Failed to parse itinerary data');
        }
      } catch (err) {
        console.error("Error fetching itinerary:", err);
        setError('Failed to fetch itinerary data: ' + err.message);
        setItineraryData(null);
      }
      setLoading(false);
    };

    fetchItinerary();
  }, [tripData]);

  useEffect(() => {
    if (mapContainer.current && !map.current && itineraryData) {
      let coordinates = getValidCoordinates(itineraryData);

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: coordinates,
        zoom: 12
      });
    }

    if (map.current && selectedDay) {
      updateMapForSelectedDay(selectedDay);
    }
  }, [itineraryData, selectedDay]);

  const updateMapForSelectedDay = (day) => {
    if (!map.current || !day) return;

    // Clear existing markers and routes
    if (map.current.getSource('route')) {
      map.current.removeLayer('route');
      map.current.removeSource('route');
    }

    const markers = document.getElementsByClassName('mapboxgl-marker');
    while (markers[0]) {
      markers[0].parentNode.removeChild(markers[0]);
    }

    // Add markers and create route for the selected day
    const coordinates = [];
    day.activities.forEach((activity, index) => {
      if (activity.geoCoordinates) {
        const [lng, lat] = parseCoordinates(activity.geoCoordinates);
        coordinates.push([lng, lat]);

        new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .setPopup(new mapboxgl.Popup().setHTML(`<h3>${activity.activity}</h3><p>${activity.time}</p>`))
          .addTo(map.current);
      }
    });

    if (coordinates.length > 1) {
      map.current.addSource('route', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': coordinates
          }
        }
      });

      map.current.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': '#888',
          'line-width': 8
        }
      });

      map.current.fitBounds(coordinates, { padding: 50 });
    }
  };

  const getValidCoordinates = (data) => {
    if (data.dailyItinerary && data.dailyItinerary.length > 0) {
      for (let day of data.dailyItinerary) {
        if (day.hotel && day.hotel.geoCoordinates) {
          let coords = parseCoordinates(day.hotel.geoCoordinates);
          if (coords) return coords;
        }
        if (day.activities && day.activities.length > 0) {
          for (let activity of day.activities) {
            if (activity.geoCoordinates) {
              let coords = parseCoordinates(activity.geoCoordinates);
              if (coords) return coords;
            }
          }
        }
      }
    }
    // Fallback to a default location (e.g., center of India)
    return [78.9629, 20.5937];
  };

  const parseCoordinates = (coords) => {
    if (typeof coords === 'string') {
      const parts = coords.split(',').map(part => parseFloat(part.trim()));
      if (parts.length === 2 && isValidLatLng(parts[0], parts[1])) {
        return [parts[1], parts[0]]; // Mapbox uses [lng, lat]
      }
    } else if (Array.isArray(coords) && coords.length === 2) {
      if (isValidLatLng(coords[0], coords[1])) {
        return [coords[1], coords[0]]; // Mapbox uses [lng, lat]
      }
    }
    return null;
  };

  const isValidLatLng = (lat, lng) => {
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
  };

  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return `${start.toLocaleDateString()} to ${end.toLocaleDateString()}`;
  };

  const createPrompt = (tripData) => {
    const destination = tripData.destination || 'Unknown destination';
    const startDate = tripData.tripDates?.startDate || 'Unknown start date';
    const endDate = tripData.tripDates?.endDate || 'Unknown end date';
    const travelerType = tripData.travelers?.type || 'Unknown traveler type';
    const travelerCount = tripData.travelers?.count || 1;
    const budget = tripData.budget || 'Unknown budget';
    const accommodationName = tripData.accommodation?.name || 'Unknown accommodation';
    const accommodationLocation = tripData.accommodation?.location || 'Unknown location';
    const accommodationRoomType = tripData.accommodation?.roomType || 'Unknown room type';
    const diningMeals = tripData.dining?.meals?.join(', ') || 'No specific meals';
    const diningDietaryRequirements = tripData.dining?.dietaryRequirements || 'None';

    return `Generate a Travel Plan for Location: ${destination}, for ${formatDateRange(startDate, endDate)} for ${travelerType} - ${travelerCount} ${travelerCount === 1 ? 'person' : 'people'} with a ${budget} budget. Include the following details:
    1. Flight details: Flight Price with Booking url
    2. Daily itinerary: Plan for each day from ${formatDateRange(startDate, endDate)} with best time to visit, including:
       - Hotel for the day: Hotel name, address, price, image url, geo coordinates, rating, description
       - Dining options for the day: Restaurant name, address, price, image url, geo coordinates, rating, description
       - Activities and places to visit: Activity name, place details, image url, geo coordinates, ticket pricing, time to travel, best time to visit
    IMPORTANT: Provide the response as a valid JSON object. Ensure all property names and string values are enclosed in double quotes. Use proper JSON formatting with commas between properties and no trailing commas. Do not include any explanations or markdown formatting outside the JSON object. All monetary values should be in INR and represented as strings (e.g., "₹1000").`;
  };

  const extractJSONFromText = (text) => {
    const jsonRegex = /{[\s\S]*}/;
    const match = text.match(jsonRegex);
    if (match) {
      return match[0];
    }
    throw new Error("Valid JSON object not found in the response");
  };

  const cleanJSONString = (jsonString) => {
    return jsonString
      .replace(/\\n/g, "\\n")
      .replace(/\\'/g, "\\'")
      .replace(/\\"/g, '\\"')
      .replace(/\\&/g, "\\&")
      .replace(/\\r/g, "\\r")
      .replace(/\\t/g, "\\t")
      .replace(/\\b/g, "\\b")
      .replace(/\\f/g, "\\f")
      .replace(/[\u0000-\u0019]+/g, "");
  };

  const parseResponse = (rawResponse) => {
    try {
      console.log("Raw response:", rawResponse);
      const extractedJSON = extractJSONFromText(rawResponse);
      console.log("Extracted JSON:", extractedJSON);
      const cleanedJSON = cleanJSONString(extractedJSON);
      console.log("Cleaned JSON:", cleanedJSON);
      const parsedData = JSON.parse(cleanedJSON);
      console.log("Parsed data:", parsedData);

      if (parsedData && typeof parsedData === 'object') {
        const travelPlan = parsedData.travelPlan || parsedData;

        const structuredData = {
          flightDetails: travelPlan.flightDetails || [],
          dailyItinerary: travelPlan.dailyItinerary || []
        };

        console.log("Structured data:", structuredData);
        return structuredData;
      } else {
        console.error('Unexpected JSON response format:', parsedData);
        return null;
      }
    } catch (error) {
      console.error("JSON parsing error:", error);
      return null;
    }
  };

  const toggleDay = (index) => {
    setSelectedDay(selectedDay === itineraryData.dailyItinerary[index] ? null : itineraryData.dailyItinerary[index]);
  };

  if (loading) return <div className="text-center py-10">Loading itinerary...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!itineraryData) return <div className="text-center py-10">No itinerary data available</div>;

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/2 overflow-y-auto p-6">
        <div className="bg-gray-200 h-40 mb-6 flex items-center justify-center">
          <h1 className="text-3xl font-bold">{tripData.destination}</h1>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Flight Details</h2>
          {itineraryData.flightDetails && itineraryData.flightDetails.length > 0 ? (
            itineraryData.flightDetails.map((flight, index) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <p>Price: {flight.flightPrice || 'Not available'}</p>
                <p>Booking URL: {flight.bookingUrl ?
                  <a href={flight.bookingUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Book Flight</a> :
                  'Not available'}
                </p>
              </div>
            ))
          ) : (
            <p>No flight details available</p>
          )}
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Daily Itinerary</h2>
          {itineraryData.dailyItinerary && itineraryData.dailyItinerary.length > 0 ? (
            itineraryData.dailyItinerary.map((day, index) => (
              <div key={index} className="mb-4">
                <button
                  className={`w-full text-left p-4 bg-gray-100 hover:bg-gray-200 ${selectedDay === day ? 'bg-gray-300' : ''}`}
                  onClick={() => toggleDay(index)}
                >
                  <h3 className="text-xl font-semibold">Day {index + 1} - {day.date}</h3>
                </button>
                {selectedDay === day && (
                  <div className="p-4 border-l border-r border-b">
                    {day.hotel && (
                      <div className="mb-4">
                        <h4 className="font-medium">Hotel:</h4>
                        <p>{day.hotel.name}</p>
                        <p>{day.hotel.address}</p>
                        <p>Price: {day.hotel.price}</p>
                        <p>Rating: {day.hotel.rating}</p>
                        <p>{day.hotel.description}</p>
                        {day.hotel.imageUrl && <img src={day.hotel.imageUrl} alt={day.hotel.name} className="mt-2 max-w-full h-auto" />}
                      </div>
                    )}
                    {day.dining && day.dining.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium">Dining:</h4>
                        {day.dining.map((meal, mealIndex) => (
                          <div key={mealIndex} className="mb-2">
                            <p>{meal.time}: {meal.restaurant}</p>
                            <p>Address: {meal.address}</p>
                            <p>Price: {meal.price}</p>
                            <p>Rating: {meal.rating}</p>
                            <p>{meal.description}</p>
                            {meal.imageUrl && <img src={meal.imageUrl} alt={meal.restaurant} className="mt-2 max-w-full h-auto" />}
                          </div>
                        ))}
                      </div>
                    )}
                    <h4 className="font-medium">Activities:</h4>
                    {day.activities && day.activities.length > 0 ? (
                      day.activities.map((activity, actIndex) => (
                        <div key={actIndex} className="mb-2">
                          <p>{activity.time}: {activity.activity}</p>
                          <p>{activity.placeDetails}</p>
                          <p>Ticket Price: {activity.ticketPricing}</p>
                          <p>Time to Travel: {activity.timeToTravel}</p>
                          <p>Best Time to Visit: {activity.bestTimeToVisit}</p>
                          {activity.imageUrl && <img src={activity.imageUrl} alt={activity.activity} className="mt-2 max-w-full h-auto" />}
                        </div>
                      ))
                    ) : (
                      <p>No activities available for this day</p>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No daily itinerary available</p>
          )}
        </section>
      </div>

      <div className="w-full md:w-1/2 h-64 md:h-full">
        <div ref={mapContainer} className="h-full"></div>
      </div>
    </div>
  );
};

export default AiFinalize;