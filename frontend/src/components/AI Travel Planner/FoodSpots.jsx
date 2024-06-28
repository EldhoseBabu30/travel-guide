import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import MapboxMap from './MapboxMap';
import axios from 'axios';

const FoodSpot = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { destination } = state;

  const [foodSpots, setFoodSpots] = useState([]);
  const [selectedFoodSpots, setSelectedFoodSpots] = useState({
    breakfast: null,
    lunch: null,
    dinner: null
  });

  useEffect(() => {
    const fetchFoodSpots = async () => {
      const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/restaurant.json?proximity=${destination}&access_token=YOUR_MAPBOX_TOKEN`);
      setFoodSpots(response.data.features.map(feature => ({
        name: feature.text,
        coordinates: feature.geometry.coordinates,
        description: feature.place_name,
        image: `https://via.placeholder.com/150?text=${feature.text.replace(/\s+/g, '+')}`
      })));
    };
    fetchFoodSpots();
  }, [destination]);

  const handleSelectFoodSpot = (meal, foodSpot) => {
    setSelectedFoodSpots({ ...selectedFoodSpots, [meal]: foodSpot });
  };

  const handleSubmit = () => {
    navigate('/itinerary', { state: { ...state, selectedFoodSpots } });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Select Your Food Spots
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {foodSpots.map((foodSpot, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={foodSpot.image}
                  alt={foodSpot.name}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {foodSpot.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {foodSpot.description}
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', p: 2 }}>
                  <Button variant="contained" color="primary" onClick={() => handleSelectFoodSpot('breakfast', foodSpot)}>
                    Select for Breakfast
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleSelectFoodSpot('lunch', foodSpot)}>
                    Select for Lunch
                  </Button>
                  <Button variant="contained" color="success" onClick={() => handleSelectFoodSpot('dinner', foodSpot)}>
                    Select for Dinner
                  </Button>
                </Box>
              </Card>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            {selectedFoodSpots.breakfast && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" component="div">
                  Breakfast Spot
                </Typography>
                <MapboxMap coordinates={selectedFoodSpots.breakfast.coordinates} />
              </Box>
            )}
            {selectedFoodSpots.lunch && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" component="div">
                  Lunch Spot
                </Typography>
                <MapboxMap coordinates={selectedFoodSpots.lunch.coordinates} />
              </Box>
            )}
            {selectedFoodSpots.dinner && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" component="div">
                  Dinner Spot
                </Typography>
                <MapboxMap coordinates={selectedFoodSpots.dinner.coordinates} />
              </Box>
            )}
          </Grid>
        </Grid>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!selectedFoodSpots.breakfast || !selectedFoodSpots.lunch || !selectedFoodSpots.dinner}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default FoodSpot;
