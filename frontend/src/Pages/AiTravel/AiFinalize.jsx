import React, { useContext, useEffect, useState, useRef } from 'react';
import { TripContext } from './context/TripContext';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion } from 'framer-motion';
import { FaDownload, FaFacebookF, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import jsPDF from 'jspdf';
import Lottie from 'react-lottie';

// Import your Lottie animations here
import manAnimation from '../../assets/Lottiefiles/man.json';
import coupleAnimation from '../../assets/Lottiefiles/couple.json';
import carAnimation from '../../assets/Lottiefiles/car.json';
import flightAnimation from '../../assets/Lottiefiles/flight.json';

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
  const itineraryRef = useRef(null);

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

      const resizeMap = () => {
        map.current.resize();
      };

      window.addEventListener('resize', resizeMap);

      return () => {
        window.removeEventListener('resize', resizeMap);
      };
    }

    if (map.current && selectedDay) {
      updateMapForSelectedDay(selectedDay);
    }
  }, [itineraryData, selectedDay]);

  const updateMapForSelectedDay = (day) => {
    if (!map.current || !day) return;

    if (map.current.getSource('route')) {
      map.current.removeLayer('route');
      map.current.removeSource('route');
    }

    const markers = document.getElementsByClassName('mapboxgl-marker');
    while (markers[0]) {
      markers[0].parentNode.removeChild(markers[0]);
    }

    const coordinates = [];
    day.activities.forEach((activity, index) => {
      if (activity.geoCoordinates) {
        const [lng, lat] = parseCoordinates(activity.geoCoordinates);
        coordinates.push([lng, lat]);

        const el = document.createElement('div');
        el.className = 'custom-marker';
        el.style.backgroundColor = '#f97316';
        el.style.width = '30px';
        el.style.height = '30px';
        el.style.borderRadius = '50%';
        el.style.display = 'flex';
        el.style.justifyContent = 'center';
        el.style.alignItems = 'center';
        el.style.color = 'white';
        el.style.fontWeight = 'bold';
        el.innerHTML = `${index + 1}`;

        new mapboxgl.Marker(el)
          .setLngLat([lng, lat])
          .setPopup(new mapboxgl.Popup().setHTML(`<h3>${index + 1}. ${activity.activity}</h3><p>${activity.time}</p>`))
          .addTo(map.current);
      }
    });

    if (coordinates.length > 1) {
      const fetchRoute = async () => {
        const coordinatesQuery = coordinates.map(coord => coord.join(',')).join(';');
        const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/walking/${coordinatesQuery}?geometries=geojson&access_token=${mapboxgl.accessToken}`);
        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0].geometry;

          map.current.addSource('route', {
            'type': 'geojson',
            'data': {
              'type': 'Feature',
              'properties': {},
              'geometry': route
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
              'line-color': '#f97316',
              'line-width': 4
            }
          });

          map.current.fitBounds(coordinates, { padding: 50 });
        }
      };

      fetchRoute();
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
    return [78.9629, 20.5937];
  };

  const parseCoordinates = (coords) => {
    if (typeof coords === 'string') {
      const parts = coords.split(',').map(part => parseFloat(part.trim()));
      if (parts.length === 2 && isValidLatLng(parts[0], parts[1])) {
        return [parts[1], parts[0]];
      }
    } else if (Array.isArray(coords) && coords.length === 2) {
      if (isValidLatLng(coords[0], coords[1])) {
        return [coords[1], coords[0]];
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

  const formatDayHeadline = (dateString) => {
    const date = new Date(dateString);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    return `${dayOfWeek}, ${formattedDate}`;
  };

  const downloadPDF = () => {
    const pdf = new jsPDF();
    let yOffset = 20;

    // Add title
    pdf.setFontSize(18);
    pdf.text(`Travel Itinerary for ${tripData.destination}`, 105, yOffset, { align: 'center' });
    yOffset += 15;

    // Add date range
    pdf.setFontSize(12);
    pdf.text(`${formatDateRange(tripData.tripDates?.startDate, tripData.tripDates?.endDate)}`, 105, yOffset, { align: 'center' });
    yOffset += 15;

    // Add daily itinerary
    pdf.setFontSize(14);
    itineraryData.dailyItinerary.forEach((day, index) => {
      pdf.text(`Day ${index + 1}: ${formatDayHeadline(day.date)}`, 10, yOffset);
      yOffset += 10;

      pdf.setFontSize(12);
      day.activities.forEach((activity, actIndex) => {
        const activityText = `${activity.time}: ${activity.activity}`;
        pdf.text(activityText, 20, yOffset);
        yOffset += 7;

        if (yOffset > 280) {
          pdf.addPage();
          yOffset = 20;
        }
      });

      yOffset += 5;
      if (yOffset > 280) {
        pdf.addPage();
        yOffset = 20;
      }
    });

    // Add copyright text
    pdf.setFontSize(10);
    pdf.text('Itinerary made with NjanSanchari', 105, 290, { align: 'center' });

    pdf.save('itinerary.pdf');
  };

  const shareToFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const shareToTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out my travel itinerary for ${tripData.destination}!`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  const shareToWhatsapp = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out my travel itinerary for ${tripData.destination}!`);
    window.open(`https://wa.me/?text=${text} ${url}`, '_blank');
  };

  const getLoadingAnimation = () => {
    const travelerCount = tripData.travelers?.count || 1;
    const isInternational = !['India', 'india'].includes(tripData.destination);

    let animationData;
    let animationWidth = 200;
    let animationHeight = 200;

    if (isInternational) {
      animationData = flightAnimation;
    } else if (travelerCount === 1) {
      animationData = manAnimation;
    } else if (travelerCount === 2) {
      animationData = coupleAnimation;
    } else {
      animationData = carAnimation;
    }

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return (
      <div className="w-48 h-48 mb-8 mx-auto">
        <Lottie options={defaultOptions} height={animationHeight} width={animationWidth} />
      </div>
    );
  };

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-orange-400 to-yellow-300">
      <div className="text-center text-white">
        {getLoadingAnimation()}
        <p className="text-2xl font-semibold">Creating your perfect itinerary...</p>
        <p className="text-lg">Fasten your seatbelt, we're almost there!</p>
      </div>
    </div>
  );

  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!itineraryData) return <div className="text-center py-10">No itinerary data available</div>;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-orange-50">
      <div className="w-full md:w-1/2 overflow-y-auto p-6" ref={itineraryRef}>
        <div className="bg-gradient-to-r from-orange-400 to-yellow-300 rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-4xl font-bold text-white">{tripData.destination}</h1>
          <p className="text-xl text-white mt-2">{formatDateRange(tripData.tripDates?.startDate, tripData.tripDates?.endDate)}</p>
        </div>

        <div className="mb-4 flex space-x-4">
          <button onClick={downloadPDF} className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition duration-300">
            <FaDownload className="mr-2" /> Download PDF
          </button>
          <button onClick={shareToFacebook} className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-300">
            <FaFacebookF />
          </button>
          <button onClick={shareToTwitter} className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition duration-300">
            <FaTwitter />
          </button>
          <button onClick={shareToWhatsapp} className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition duration-300">
            <FaWhatsapp />
          </button>
        </div>

        <section className="mb-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-orange-800">Flight Details</h2>
          {itineraryData.flightDetails && itineraryData.flightDetails.length > 0 ? (
            itineraryData.flightDetails.map((flight, index) => (
              <div key={index} className="mb-4 p-4 border rounded-lg bg-orange-50">
                <p className="text-lg"><span className="font-semibold">Price:</span> {flight.flightPrice || 'Not available'}</p>
                <p className="text-lg">
                  <span className="font-semibold">Booking URL:</span> {flight.bookingUrl ?
                    <a href={flight.bookingUrl} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">Book Flight</a> :
                    'Not available'}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No flight details available</p>
          )}
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-orange-800">Daily Itinerary</h2>
          {itineraryData.dailyItinerary && itineraryData.dailyItinerary.length > 0 ? (
            itineraryData.dailyItinerary.map((day, index) => (
              <div key={index} className="mb-4 bg-white rounded-lg shadow-md overflow-hidden">
                <div
                  className="w-full text-left p-4 bg-orange-100 cursor-pointer"
                  onClick={() => toggleDay(index)}
                >
                  <h3 className="text-xl font-semibold text-orange-800">{formatDayHeadline(day.date)}</h3>
                </div>
                {selectedDay === day && (
                  <div className="p-4 border-t border-orange-200">
                    {day.hotel && (
                      <div className="mb-4 p-3 bg-orange-50 rounded-lg">
                        <h4 className="font-medium text-lg text-orange-800">Hotel:</h4>
                        <p className="text-gray-700">{day.hotel.name}</p>
                        <p className="text-gray-600">{day.hotel.address}</p>
                        <p className="text-gray-600">Price: {day.hotel.price}</p>
                        <p className="text-gray-600">Rating: {day.hotel.rating}</p>
                        <p className="text-gray-700 mt-2">{day.hotel.description}</p>
                        {day.hotel.imageUrl && <img src={day.hotel.imageUrl} alt={day.hotel.name} className="mt-2 max-w-full h-auto rounded-lg shadow" />}
                      </div>
                    )}
                    {day.dining && day.dining.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium text-lg text-orange-800">Dining:</h4>
                        {day.dining.map((meal, mealIndex) => (
                          <div key={mealIndex} className="mb-2 p-3 bg-yellow-50 rounded-lg">
                            <p className="font-semibold text-yellow-800">{meal.time}: {meal.restaurant}</p>
                            <p className="text-gray-600">Address: {meal.address}</p>
                            <p className="text-gray-600">Price: {meal.price}</p>
                            <p className="text-gray-600">Rating: {meal.rating}</p>
                            <p className="text-gray-700 mt-2">{meal.description}</p>
                            {meal.imageUrl && <img src={meal.imageUrl} alt={meal.restaurant} className="mt-2 max-w-full h-auto rounded-lg shadow" />}
                          </div>
                        ))}
                      </div>
                    )}
                    <h4 className="font-medium text-lg text-orange-800">Activities:</h4>
                    {day.activities && day.activities.length > 0 ? (
                      day.activities.map((activity, actIndex) => (
                        <div key={actIndex} className="mb-2 p-3 bg-orange-50 rounded-lg">
                          <p className="font-semibold text-orange-800">{actIndex + 1}. {activity.time}: {activity.activity}</p>
                          <p className="text-gray-700">{activity.placeDetails}</p>
                          <p className="text-gray-600">Ticket Price: {activity.ticketPricing}</p>
                          <p className="text-gray-600">Time to Travel: {activity.timeToTravel}</p>
                          <p className="text-gray-600">Best Time to Visit: {activity.bestTimeToVisit}</p>
                          {activity.imageUrl && <img src={activity.imageUrl} alt={activity.activity} className="mt-2 max-w-full h-auto rounded-lg shadow" />}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600">No activities available for this day</p>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600">No daily itinerary available</p>
          )}
        </section>
      </div>

      <div className="w-full md:w-1/2 h-64 md:h-full">
        <div ref={mapContainer} className="w-full h-full"></div>
      </div>
    </div>
  );
};

export default AiFinalize;