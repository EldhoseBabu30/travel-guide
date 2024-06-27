import React from 'react';
import { Container, Typography, Card, CardContent, CardMedia, Button, Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import MapboxMap from './MapboxMap';

const Finalize = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { hotels, foodSpots, position } = state || {};

  const itinerary = [...hotels, ...foodSpots];

  const handleGoBack = () => {
    navigate('/plan');
  };

  const markers = itinerary.map(item => ({ name: item.name, coordinates: item.coordinates }));
  const polyline = itinerary.map(item => item.coordinates);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Finalize Itinerary
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          {itinerary.map((item, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardMedia
                component="img"
                height="140"
                image={item.image}
                alt={item.name}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ₹{item.price}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} md={6}>
          <MapboxMap center={position} markers={markers} polyline={polyline} />
        </Grid>
      </Grid>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button variant="contained" color="secondary" onClick={handleGoBack}>
          Go Back to Planning
        </Button>
      </Box>
    </Container>
  );
};

export default Finalize;
