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
  const [activeDay, setActiveDay] = useState(null);

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
        
        // Debugging log
        console.log("Calling parseResponse with rawResponse");
        const structuredData = parseResponse(rawResponse);
        
        // Check and log structured data
        console.log("Structured data after parsing:", structuredData);
        
        setItineraryData(structuredData);
      } catch (err) {
        console.error("Error fetching itinerary:", err);
        setError('Failed to fetch itinerary data: ' + err.message);
      }
      setLoading(false);
    };
    

    fetchItinerary();
  }, [tripData]);

  useEffect(() => {
    if (mapContainer.current && !map.current && itineraryData) {
      const coordinates = itineraryData.hotelOptions?.[0]?.geoCoordinates.split(', ').map(Number);
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: coordinates ? coordinates : [0, 0],
        zoom: 12
      });
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [itineraryData]);

  useEffect(() => {
    if (map.current && itineraryData && activeDay !== null) {
      const dayActivities = itineraryData.dailyItinerary[activeDay].activities;
      const coordinates = dayActivities
        .filter(activity => activity.coordinates)
        .map(activity => activity.coordinates.split(', ').map(Number));

      if (coordinates.length > 1) {
        map.current.fitBounds(coordinates, { padding: 50 });

        if (map.current.getSource('route')) {
          map.current.removeLayer('route');
          map.current.removeSource('route');
        }

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

        dayActivities.forEach((activity, index) => {
          if (activity.coordinates) {
            const [lng, lat] = activity.coordinates.split(', ').map(Number);
            new mapboxgl.Marker()
              .setLngLat([lng, lat])
              .setPopup(new mapboxgl.Popup().setHTML(`<h3>${activity.activity}</h3><p>${activity.time}</p>`))
              .addTo(map.current);
          }
        });
      }
    }
  }, [activeDay, itineraryData]);

  const formatDateRange = (startDate, endDate) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formatDate = (date) => {
      if (!date) return 'Unknown date';
      return new Date(date).toLocaleDateString(undefined, options);
    };
    return `${formatDate(startDate)} to ${formatDate(endDate)}`;
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
    2. Hotels options: List with ${accommodationName}, ${accommodationLocation} - ${accommodationRoomType}, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions
    3. Dining options: ${diningMeals}, Dietary Requirements: ${diningDietaryRequirements}, Dining address, Price, Dining image url, geo coordinates, rating, descriptions
    4. Places to visit nearby: placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel
    5. Daily itinerary: Plan for each day from ${formatDateRange(startDate, endDate)} with best time to visit
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
    return jsonString.trim().replace(/(\r\n|\n|\r|\t)/gm, "");
  };
  
  const parseResponse = (rawResponse) => {
    try {
      let jsonString = extractJSONFromText(rawResponse);
      console.log("Extracted JSON string:", jsonString);
      jsonString = cleanJSONString(jsonString);
      console.log("Cleaned JSON string:", jsonString);
      const parsedData = JSON.parse(jsonString);
      if (parsedData && parsedData.travelPlan) {
        return parsedData.travelPlan;
      } else {
        console.error('Unexpected JSON response format:', parsedData);
        return null;
      }
    } catch (error) {
      console.error("JSON parsing error:", error);
      return null;
    }
  };
  
  const formatCoordinates = (coordinates) => {
    if (Array.isArray(coordinates)) {
      return coordinates.join(', ');
    } else if (typeof coordinates === 'string') {
      return coordinates;
    } else if (typeof coordinates === 'object' && coordinates !== null) {
      return `${coordinates.latitude}, ${coordinates.longitude}`;
    }
    return 'Not available';
  };

  const toggleDay = (index) => {
    setActiveDay(activeDay === index ? null : index);
  };

  if (loading) return <div className="text-center py-10">Loading itinerary...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!itineraryData || Object.keys(itineraryData).length === 0) return <div className="text-center py-10">No itinerary data available</div>;

  return (
    <div className="flex h-screen">
      <div className="w-1/2 overflow-y-auto p-6">
        <div className="bg-gray-200 h-40 mb-6 flex items-center justify-center">
          <h1 className="text-3xl font-bold">{tripData.destination}</h1>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Flight Details</h2>
          <p>Price: {itineraryData.flightDetails?.flightPrice || 'Not available'}</p>
          <p>Booking URL: {itineraryData.flightDetails?.bookingUrl ? 
            <a href={itineraryData.flightDetails.bookingUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Book Flight</a> :
            'Not available'}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Hotel Options</h2>
          {itineraryData.hotelOptions?.map((hotel, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <h3 className="text-xl font-medium">{hotel.hotelName || 'Unnamed Hotel'}</h3>
              <p>Address: {hotel.hotelAddress || 'Not available'}</p>
              <p>Price: {hotel.hotelPrice || 'Not available'}</p>
              <p>Rating: {hotel.hotelRating || 'Not rated'}</p>
              <p>Description: {hotel.hotelDescription || 'No description available'}</p>
              {hotel.hotelImageUrl && <img src={hotel.hotelImageUrl} alt={hotel.hotelName} className="mt-2 max-w-full h-auto" />}
            </div>
          ))}
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Dining Options</h2>
          {itineraryData.diningOptions?.map((restaurant, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <h3 className="text-xl font-medium">{restaurant.diningName || 'Unnamed Restaurant'}</h3>
              <p>Address: {restaurant.diningAddress || 'Not available'}</p>
              <p>Price: {restaurant.diningPrice || 'Not available'}</p>
              <p>Rating: {restaurant.diningRating || 'Not rated'}</p>
              <p>Description: {restaurant.diningDescription || 'No description available'}</p>
              {restaurant.diningImageUrl && <img src={restaurant.diningImageUrl} alt={restaurant.diningName} className="mt-2 max-w-full h-auto" />}
            </div>
          ))}
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Places to Visit</h2>
          {itineraryData.placesToVisit?.map((place, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <h3 className="text-xl font-medium">{place.placeName || 'Unnamed Place'}</h3>
              <p>Details: {place.placeDetails || 'No details available'}</p>
              <p>Ticket Price: {place.ticketPricing || 'Not available'}</p>
              <p>Time to Travel: {place.timeToTravel || 'Not specified'}</p>
              {place.placeImageUrl && <img src={place.placeImageUrl} alt={place.placeName} className="mt-2 max-w-full h-auto" />}
            </div>
          ))}
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Daily Itinerary</h2>
          {itineraryData.dailyItinerary?.map((day, index) => (
            <div key={index} className="mb-4">
              <button 
                className={`w-full text-left p-4 bg-gray-100 hover:bg-gray-200 ${activeDay === index ? 'bg-gray-300' : ''}`}
                onClick={() => toggleDay(index)}
              >
                <h3 className="text-xl font-semibold">Day {index + 1} - {day.day}</h3>
              </button>
              {activeDay === index && (
                <div className="p-4 border-l border-r border-b">
                  {day.activities?.map((activity, actIndex) => (
                    <div key={actIndex} className="mb-4">
                      <h4 className="font-medium">{activity.time}: {activity.activity}</h4>
                      <p>Description: {activity.description || 'No description available'}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      </div>

      <div className="w-1/2">
        <div ref={mapContainer} className="h-full"></div>
      </div>
    </div>
  );
};

export default AiFinalize;
