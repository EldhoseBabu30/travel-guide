import React from 'react';
import { Box, Button, Container, Typography, Card, CardContent, Grid } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import MapboxMap from './MapboxMap';

const Itinerary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { selectedHotel, selectedFoodSpots } = state;

  const handleDownloadPDF = () => {
    // Implement PDF generation logic here
  };

  const handleShare = () => {
    // Implement sharing logic here
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Your Trip Itinerary
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Hotel
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedHotel.name}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Breakfast Spot
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedFoodSpots.breakfast.name}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Lunch Spot
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedFoodSpots.lunch.name}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Dinner Spot
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedFoodSpots.dinner.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <MapboxMap coordinates={selectedHotel.coordinates} />
            <MapboxMap coordinates={selectedFoodSpots.breakfast.coordinates} />
            <MapboxMap coordinates={selectedFoodSpots.lunch.coordinates} />
            <MapboxMap coordinates={selectedFoodSpots.dinner.coordinates} />
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDownloadPDF}
          >
            Download PDF
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleShare}
          >
            Share
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Itinerary;
