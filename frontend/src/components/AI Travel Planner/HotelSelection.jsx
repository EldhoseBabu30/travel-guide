import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import MapboxMap from './MapboxMap';
import axios from 'axios';

const HotelSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { destination } = state;

  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/hotel.json?proximity=${destination}&access_token=YOUR_MAPBOX_TOKEN`);
      setHotels(response.data.features.map(feature => ({
        name: feature.text,
        coordinates: feature.geometry.coordinates,
        description: feature.place_name,
        price: Math.floor(Math.random() * 5000) + 1000,
        image: `https://via.placeholder.com/150?text=${feature.text.replace(/\s+/g, '+')}`
      })));
    };
    fetchHotels();
  }, [destination]);

  const handleSelectHotel = (hotel) => {
    setSelectedHotel(hotel);
  };

  const handleSubmit = () => {
    navigate('/food-spots', { state: { ...state, selectedHotel } });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Select Your Hotel
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {hotels.map((hotel, index) => (
              <Card key={index} onClick={() => handleSelectHotel(hotel)} sx={{ cursor: 'pointer', mb: 2 }}>
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
                  <Typography variant="body1" color="text.primary">
                    Price: ${hotel.price}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            {selectedHotel && (
              <MapboxMap coordinates={selectedHotel.coordinates} />
            )}
          </Grid>
        </Grid>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!selectedHotel}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HotelSelection;
