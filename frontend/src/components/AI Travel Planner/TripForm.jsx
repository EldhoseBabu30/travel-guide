import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const TripForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: '',
    days: '',
    people: '',
    focus: '',
    budget: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/suggestions', { state: formData });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Plan Your Trip
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Days"
            name="days"
            value={formData.days}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="People"
            name="people"
            value={formData.people}
            onChange={handleChange}
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Focus</InputLabel>
            <Select
              name="focus"
              value={formData.focus}
              onChange={handleChange}
              required
            >
              <MenuItem value="sightseeing">Sightseeing</MenuItem>
              <MenuItem value="adventure">Adventure</MenuItem>
              <MenuItem value="relaxation">Relaxation</MenuItem>
              <MenuItem value="culture">Culture</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Plan Trip
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default TripForm;
