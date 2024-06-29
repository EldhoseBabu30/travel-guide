import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Slider, Checkbox, FormControlLabel, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const mealPrices = [
  { breakfast: 10, lunch: 17, dinner: 18 },  // Cheap
  { breakfast: 20, lunch: 34, dinner: 36 },  // Mid
  { breakfast: 30, lunch: 51, dinner: 54 }   // High
];

const TripHome = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state || {
    days: 1,
    people: 1,
    budget: 0,
    destination: 'paris'
  };

  const [budget, setBudget] = useState(formData.budget || 0);
  const [meals, setMeals] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
  });

  const handleBudgetChange = (event, newValue) => {
    setBudget(newValue);
  };

  const handleMealChange = (event) => {
    setMeals({
      ...meals,
      [event.target.name]: event.target.checked,
    });
  };

  const totalCost = budget >= 0 && budget < mealPrices.length ? {
    breakfast: meals.breakfast ? mealPrices[budget].breakfast * formData.days * formData.people : 0,
    lunch: meals.lunch ? mealPrices[budget].lunch * formData.days * formData.people : 0,
    dinner: meals.dinner ? mealPrices[budget].dinner * formData.days * formData.people : 0,
  } : { breakfast: 0, lunch: 0, dinner: 0 };

  const position = [48.8566, 2.3522]; // Default Paris position
  const [mapCenter, setMapCenter] = useState(position);

  useEffect(() => {
    const fetchCoordinates = async (destination) => {
      const coordinates = {
        paris: [48.8566, 2.3522],
        london: [51.5074, -0.1278],
        newyork: [40.7128, -74.0060],
      };
      setMapCenter(coordinates[destination.toLowerCase()] || position);
    };
    if (formData.destination) {
      fetchCoordinates(formData.destination);
    }
  }, [formData.destination]);

  const handleNext = () => {
    navigate('/next-step', { state: { ...formData, budget, meals } });
  };

  return (
    <Container className="flex flex-row min-h-screen">
      <Box className="w-1/2 p-4">
        <Box className="flex items-center mb-4">
          <ArrowBack />
          <Typography variant="h6" className="ml-2">Trip Planner AI</Typography>
          <Box className="flex-1 text-right">
            <Typography variant="body1">Step 1 of 2</Typography>
          </Box>
        </Box>
        <Typography variant="h5" className="mb-4">
          Meals preferences
        </Typography>
        <Typography variant="body1" className="mb-4">
          Select the meals you would like to include in your trip, your budget for it and the type of food you prefer.
        </Typography>
        <Typography variant="h6" className="mb-2">
          Budget level
        </Typography>
        <Typography variant="body1" className="mb-4">
          Select the budget level you are planning to spend.
        </Typography>
        <Slider
          value={budget}
          onChange={handleBudgetChange}
          step={1}
          marks={[
            { value: 0, label: 'Cheap' },
            { value: 1, label: 'Mid' },
            { value: 2, label: 'High' },
          ]}
          min={0}
          max={2}
          valueLabelDisplay="off"
        />
        <Typography variant="h6" className="mt-4 mb-2">
          Meals to include
        </Typography>
        <Typography variant="body2" className="mb-4">
          Prices are an estimate of each meal for {formData.days} days, {formData.people} person
        </Typography>
        {Object.keys(meals).map((meal) => (
          <FormControlLabel
            key={meal}
            control={
              <Checkbox
                checked={meals[meal]}
                onChange={handleMealChange}
                name={meal}
                color="primary"
              />
            }
            label={
              <Box>
                <Typography variant="body1">{meal.charAt(0).toUpperCase() + meal.slice(1)}</Typography>
                {budget >= 0 && budget < mealPrices.length && (
                  <Typography variant="body2">
                    {`$${totalCost[meal]} ($${mealPrices[budget][meal]} per meal)`}
                  </Typography>
                )}
              </Box>
            }
          />
        ))}
        <Button variant="contained" color="primary" className="mt-4" onClick={handleNext}>
          Next
        </Button>
      </Box>
      <Box className="w-1/2">
        <MapContainer center={mapCenter} zoom={13} style={{ height: '100vh' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={mapCenter}>
            <Popup>
              {formData.destination.charAt(0).toUpperCase() + formData.destination.slice(1)}
            </Popup>
          </Marker>
        </MapContainer>
      </Box>
    </Container>
  );
};

export default TripHome;
