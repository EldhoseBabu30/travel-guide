import React, { useEffect, useState, useContext } from 'react';
import { getItinerary } from '../AiTravel/GeminiAPI';
import { TripContext } from '../AiTravel/context/TripContext';

const AiFinalize = () => {
  const { tripData } = useContext(TripContext);
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchItinerary = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!tripData) throw new Error("Trip data is not defined");
      console.log("Trip data:", JSON.stringify(tripData, null, 2));
      const response = await getItinerary(tripData);
      console.log('API Response:', JSON.stringify(response, null, 2));
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch itinerary');
      }
      console.log('Parsed itinerary data:', JSON.stringify(response.data, null, 2));
      setItinerary(response.data);
    } catch (error) {
      console.error('Error fetching itinerary:', error);
      setError(error.message || 'An error occurred while fetching the itinerary');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (tripData) {
      fetchItinerary();
    }
  }, [tripData]);

  const renderHotelOptions = (hotels) => (
    <div className="hotel-options">
      <h3>Hotel Options</h3>
      {hotels.map((hotel, index) => (
        <div key={index} className="hotel-option">
          <h4>{hotel.defaultAccommodation}</h4>
          <p><strong>Location:</strong> {hotel.defaultLocation}</p>
          <p><strong>Room Type:</strong> {hotel.defaultRoomType}</p>
          <p><strong>Address:</strong> {hotel.hotelAddress}</p>
          <p><strong>Price:</strong> {hotel.price}</p>
          <p><strong>Rating:</strong> {hotel.rating}</p>
          <p><strong>Description:</strong> {hotel.descriptions}</p>
          <img src={hotel.hotelImageUrl} alt={hotel.defaultAccommodation} style={{maxWidth: '300px'}} />
        </div>
      ))}
    </div>
  );

  const renderDiningOptions = (dinings) => (
    <div className="dining-options">
      <h3>Dining Options</h3>
      {dinings.map((dining, index) => (
        <div key={index} className="dining-option">
          <h4>{dining.defaultMeal}</h4>
          <p><strong>Dietary Requirements:</strong> {dining['Dietary Requirements']}</p>
          <p><strong>Address:</strong> {dining['Dining address']}</p>
          <p><strong>Price:</strong> {dining.price}</p>
          <p><strong>Rating:</strong> {dining.rating}</p>
          <p><strong>Description:</strong> {dining.descriptions}</p>
          <img src={dining['Dining image url']} alt={dining.defaultMeal} style={{maxWidth: '300px'}} />
        </div>
      ))}
    </div>
  );

  const renderPlacesToVisit = (places) => (
    <div className="places-to-visit">
      <h3>Places to Visit</h3>
      {places.map((place, index) => (
        <div key={index} className="place">
          <h4>{place.placeName}</h4>
          <p><strong>Details:</strong> {place['Place Details']}</p>
          <p><strong>Ticket Price:</strong> {place.ticketPricing}</p>
          <p><strong>Travel Time:</strong> {place['Time to travel']}</p>
          <img src={place['Place Image Url']} alt={place.placeName} style={{maxWidth: '300px'}} />
        </div>
      ))}
    </div>
  );

  const renderDailyItinerary = (dailyItinerary) => (
    <div className="daily-itinerary">
      <h3>Daily Itinerary</h3>
      {dailyItinerary.map((day, index) => (
        <div key={index} className="day">
          <h4>{day.day}</h4>
          {day.activities.map((activity, actIndex) => (
            <div key={actIndex} className="activity">
              <p><strong>{activity.time}:</strong> {activity.activity}</p>
              <p>{activity.details}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  if (isLoading) {
    return <div className="loading-container"><p>Loading travel itinerary...</p></div>;
  }

  if (error) {
    return <div className="error-container"><h2>Error</h2><p>{error}</p></div>;
  }

  if (!itinerary || Object.keys(itinerary).length === 0) {
    return <div className="no-itinerary-container"><h2>No Itinerary</h2><p>The itinerary could not be generated.</p></div>;
  }

  return (
    <div className="itinerary-container" style={{ marginTop: '20px', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Your Detailed Travel Itinerary</h1>

      <div className="trip-overview">
        <h2>Trip Overview</h2>
        <p><strong>Destination:</strong> {itinerary.location}</p>
        <p><strong>Dates:</strong> {itinerary.startDate} to {itinerary.endDate}</p>
        <p><strong>Travelers:</strong> {itinerary.travellers}</p>
        <p><strong>Budget:</strong> {itinerary.budget}</p>
      </div>

      {itinerary.flightDetails && (
        <div className="flight-details">
          <h2>Flight Details</h2>
          <p><strong>Price:</strong> {itinerary.flightDetails.flightPrice}</p>
          <p><strong>Booking:</strong> <a href={itinerary.flightDetails.bookingUrl} target="_blank" rel="noopener noreferrer">Book Now</a></p>
        </div>
      )}

      {itinerary.hotelOptions && renderHotelOptions(itinerary.hotelOptions)}
      {itinerary.diningOptions && renderDiningOptions(itinerary.diningOptions)}
      {itinerary.placesToVisitNearby && renderPlacesToVisit(itinerary.placesToVisitNearby)}
      {itinerary.dailyItinerary && renderDailyItinerary(itinerary.dailyItinerary)}
    </div>
  );
};

export default AiFinalize;
