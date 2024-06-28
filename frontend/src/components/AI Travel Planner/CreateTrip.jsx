import React, { useState, useEffect } from 'react';
import { Box, Button, Container, TextField, Typography, MenuItem, Select, InputLabel, FormControl, Autocomplete } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MapboxMap from './MapboxMap';

mapboxgl.accessToken = "pk.eyJ1IjoiYWJzaGFuIiwiYSI6ImNseHZ1ajUybTBtbGcyanF6eGFid216OHAifQ.1AXCW22VbJsmDC-2oIm0yw";

const CreateTrip = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: '',
    startDate: new Date(),
    days: '',
    people: '',
    focus: '',
    budget: ''
  });
  const [suggestions, setSuggestions] = useState([]);
  const [position, setPosition] = useState([76.0827, 11.0403]); // Default to Malappuram

  useEffect(() => {
    if (formData.destination) {
      const fetchSuggestions = async () => {
        const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${formData.destination}.json?access_token=${mapboxgl.accessToken}`);
        setSuggestions(response.data.features);
      };
      fetchSuggestions();
    }
  }, [formData.destination]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, startDate: date });
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData({ ...formData, destination: suggestion.place_name });
    setPosition(suggestion.center);
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/suggestions', { state: formData });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="sm">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Create Your Trip
          </Typography>
          <form onSubmit={handleSubmit}>
            <Autocomplete
              options={suggestions.map((sugg) => sugg.place_name)}
              onInputChange={(event, newInputValue) => {
                setFormData({ ...formData, destination: newInputValue });
              }}
              onChange={(event, newValue) => {
                const selected = suggestions.find((sugg) => sugg.place_name === newValue);
                if (selected) {
                  handleSuggestionClick(selected);
                }
              }}
              renderInput={(params) => <TextField {...params} label="Destination" margin="normal" required />}
              fullWidth
            />
            <DatePicker
              label="Start Date"
              value={formData.startDate}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" required />}
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
              label="Budget (INR)"
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
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Destination Map
          </Typography>
          <MapboxMap center={position} markers={[]} polyline={[]} />
        </Box>
      </Container>
    </LocalizationProvider>
  );
};

export default CreateTrip;
