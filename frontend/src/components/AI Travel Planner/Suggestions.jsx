import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Card, CardContent, CardMedia, Button, Grid, Paper } from '@mui/material';
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
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        Suggestions for {destination}
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Hotels
          </Typography>
          {hotels.map(hotel => (
            <Card key={hotel.name} sx={{ mb: 2 }}>
              <CardMedia
                component="img"
                height="140"
                image={hotel.image}
                alt={hotel.name}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {hotel.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {hotel.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ₹{hotel.price}
                </Typography>
              </CardContent>
            </Card>
          ))}
          <Typography variant="h6" gutterBottom>
            Food Spots
          </Typography>
          {foodSpots.map(spot => (
            <Card key={spot.name} sx={{ mb: 2 }}>
              <CardMedia
                component="img"
                height="140"
                image={spot.image}
                alt={spot.name}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {spot.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {spot.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ₹{spot.price}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ height: '100%' }}>
            <MapboxMap center={position} markers={markers} polyline={[]} />
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button variant="contained" color="primary" onClick={handleFinalizeItinerary}>
          Finalize Itinerary
        </Button>
      </Box>
    </Container>
  );
};

export default Suggestions;
