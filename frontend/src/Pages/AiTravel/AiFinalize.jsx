import React, { useContext, useEffect, useState } from 'react';
import { TripContext } from './context/TripContext';
import { getItinerary } from './GeminiAPI';

const AiFinalize = () => {
  const { tripData } = useContext(TripContext);
  const [itineraryData, setItineraryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rawResponse, setRawResponse] = useState(null);

  useEffect(() => {
    const fetchItinerary = async () => {
      setLoading(true);
      setError(null);
      setRawResponse(null);
      try {
        const response = await getItinerary(tripData);
        if (response.success) {
          console.log('Itinerary data:', JSON.stringify(response.data, null, 2));
          setItineraryData(response.data);
        } else {
          setError(response.error);
          setRawResponse(response.rawResponse);
        }
      } catch (err) {
        setError('Failed to fetch itinerary data: ' + err.message);
      }
      setLoading(false);
    };

    fetchItinerary();
  }, [tripData]);

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

  if (loading) return <div>Loading itinerary...</div>;
  if (error) return (
    <div>
      <h2>Error:</h2>
      <p>{error}</p>
      {rawResponse && (
        <div>
          <h3>Raw API Response (truncated):</h3>
          <pre>{rawResponse}</pre>
        </div>
      )}
    </div>
  );
  if (!itineraryData) return <div>No itinerary data available</div>;

  return (
    <div className="ai-finalize">
      <h1>Your Travel Itinerary</h1>
      
      <section>
        <h2>Flight Details</h2>
        <p>Price: {itineraryData.flightDetails?.price || 'Not available'}</p>
        <p>Booking URL: {itineraryData.flightDetails?.bookingUrl ? 
          <a href={itineraryData.flightDetails.bookingUrl} target="_blank" rel="noopener noreferrer">Book Flight</a> :
          'Not available'}
        </p>
      </section>

      <section>
        <h2>Hotel Options</h2>
        {itineraryData.hotelOptions?.map((hotel, index) => (
          <div key={index} className="hotel-option">
            <h3>{hotel.name || 'Unnamed Hotel'}</h3>
            <p>Location: {hotel.location || 'Not specified'}</p>
            <p>Room Type: {hotel.roomType || 'Not specified'}</p>
            <p>Address: {hotel.address || 'Not available'}</p>
            <p>Price: {hotel.price || 'Not available'}</p>
            <p>Rating: {hotel.rating || 'Not rated'}</p>
            <p>Description: {hotel.description || 'No description available'}</p>
            {hotel.imageUrl && <img src={hotel.imageUrl} alt={hotel.name} style={{maxWidth: '300px'}} />}
            <p>Coordinates: {formatCoordinates(hotel.geoCoordinates)}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Dining Options</h2>
        {itineraryData.diningOptions?.map((dining, index) => (
          <div key={index} className="dining-option">
            <h3>{dining.name || 'Unnamed Restaurant'}</h3>
            <p>Cuisine: {dining.cuisine || 'Not specified'}</p>
            <p>Address: {dining.address || 'Not available'}</p>
            <p>Price: {dining.price || 'Not available'}</p>
            <p>Rating: {dining.rating || 'Not rated'}</p>
            <p>Description: {dining.description || 'No description available'}</p>
            {dining.imageUrl && <img src={dining.imageUrl} alt={dining.name} style={{maxWidth: '300px'}} />}
            <p>Coordinates: {formatCoordinates(dining.geoCoordinates)}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Places to Visit</h2>
        {itineraryData.placesToVisit?.map((place, index) => (
          <div key={index} className="place-to-visit">
            <h3>{place.name || 'Unnamed Place'}</h3>
            <p>Details: {place.details || 'No details available'}</p>
            {place.imageUrl && <img src={place.imageUrl} alt={place.name} style={{maxWidth: '300px'}} />}
            <p>Coordinates: {formatCoordinates(place.geoCoordinates)}</p>
            <p>Ticket Price: {place.ticketPrice || 'Not available'}</p>
            <p>Travel Time: {place.travelTime || 'Not specified'}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Daily Itinerary</h2>
        {itineraryData.dailyItinerary?.map((day, index) => (
          <div key={index} className="daily-plan">
            <h3>Day {index + 1}</h3>
            <p>Date: {day.date || 'Not specified'}</p>
            <ul>
              {day.activities?.map((activity, actIndex) => (
                <li key={actIndex}>
                  <strong>{activity.time || 'No time specified'}</strong>: {activity.description || 'No description'}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AiFinalize;