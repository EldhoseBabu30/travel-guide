import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import MapboxMap from './MapboxMap';

const Suggestions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { destination } = state || {};
  const [hotels, setHotels] = useState([]);
  const [foodSpots, setFoodSpots] = useState([]);
  const [position, setPosition] = useState([11.0403, 76.0827]);

  useEffect(() => {
    if (destination) {
      const fetchData = async () => {
        const mapboxToken = 'pk.eyJ1IjoiYWJzaGFuIiwiYSI6ImNseHZ1ajUybTBtbGcyanF6eGFid216OHAifQ.1AXCW22VbJsmDC-2oIm0yw';
        // Fetch coordinates for the destination
        const geocodeResponse = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${destination}.json?access_token=${mapboxToken}`);
        const { center } = geocodeResponse.data.features[0];
        setPosition(center);

        // Fetch hotels and food spots using Mapbox Places API
        const hotelsResponse = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/hotel.json?proximity=${center[0]},${center[1]}&access_token=${mapboxToken}`);
        setHotels(hotelsResponse.data.features.map(feature => ({
          name: feature.text,
          coordinates: feature.geometry.coordinates,
          description: feature.place_name,
          price: Math.floor(Math.random() * 5000) + 1000,
          image: `https://via.placeholder.com/150?text=${feature.text.replace(/\s+/g, '+')}`
        })));

        const foodSpotsResponse = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/restaurant.json?proximity=${center[0]},${center[1]}&access_token=${mapboxToken}`);
        setFoodSpots(foodSpotsResponse.data.features.map(feature => ({
          name: feature.text,
          coordinates: feature.geometry.coordinates,
          description: feature.place_name,
          price: Math.floor(Math.random() * 1000) + 100,
          image: `https://via.placeholder.com/150?text=${feature.text.replace(/\s+/g, '+')}`
        })));
      };

      fetchData();
    }
  }, [destination]);

  const handleFinalizeItinerary = () => {
    navigate('/finalize', { state: { hotels, foodSpots, position } });
  };

  const markers = [
    ...hotels.map(hotel => ({ name: hotel.name, coordinates: hotel.coordinates })),
    ...foodSpots.map(spot => ({ name: spot.name, coordinates: spot.coordinates })),
  ];

  return (
    <Container className="mt-8">
      <Typography variant="h4" gutterBottom className="mb-4 text-center">
        Suggestions for {destination}
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom className="mb-4">
            Hotels
          </Typography>
          {hotels.map(hotel => (
            <div key={hotel.name} className="mb-4 border rounded-lg p-4 shadow-md">
              <img
                className="h-40 w-full object-cover rounded-md mb-4"
                src={hotel.image}
                alt={hotel.name}
              />
              <div className="mb-2">
                <Typography variant="h5" component="div">
                  {hotel.name}
                </Typography>
              </div>
              <div className="text-gray-600 mb-2">
                <Typography variant="body2">
                  {hotel.description}
                </Typography>
              </div>
              <div className="text-gray-600">
                <Typography variant="body2">
                  Price: ₹{hotel.price}
                </Typography>
              </div>
            </div>
          ))}
          <Typography variant="h6" gutterBottom className="mb-4">
            Food Spots
          </Typography>
          {foodSpots.map(spot => (
            <div key={spot.name} className="mb-4 border rounded-lg p-4 shadow-md">
              <img
                className="h-40 w-full object-cover rounded-md mb-4"
                src={spot.image}
                alt={spot.name}
              />
              <div className="mb-2">
                <Typography variant="h5" component="div">
                  {spot.name}
                </Typography>
              </div>
              <div className="text-gray-600 mb-2">
                <Typography variant="body2">
                  {spot.description}
                </Typography>
              </div>
              <div className="text-gray-600">
                <Typography variant="body2">
                  Price: ₹{spot.price}
                </Typography>
              </div>
            </div>
          ))}
        </Grid>
        <Grid item xs={12} md={6}>
          <MapboxMap center={position} markers={markers} polyline={[]} />
        </Grid>
      </Grid>
      <Box className="mt-8 text-center">
        <Button variant="contained" color="primary" onClick={handleFinalizeItinerary}>
          Finalize Itinerary
        </Button>
      </Box>
    </Container>
  );
};

export default Suggestions;
