import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography, MenuItem, Select, InputLabel, FormControl, IconButton, Autocomplete } from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const TripForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: '',
    dates: [],
    destinations: [],
    focus: '',
    people: 1,
    companion: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddDestination = () => {
    setFormData({ ...formData, destinations: [...formData.destinations, formData.destination] });
    setFormData({ ...formData, destination: '' });
  };

  const handleRemoveDestination = (index) => {
    const newDestinations = [...formData.destinations];
    newDestinations.splice(index, 1);
    setFormData({ ...formData, destinations: newDestinations });
  };

  const handleDatesChange = (newDates) => {
    setFormData({ ...formData, dates: newDates });
  };

  const handlePeopleChange = (increment) => {
    setFormData({ ...formData, people: formData.people + increment });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/budget-selection', { state: formData });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Plan Your Trip
        </Typography>
        <form onSubmit={handleSubmit}>
          <Autocomplete
            options={[]} // Fetch from API based on user input
            value={formData.destination}
            onChange={(event, newValue) => setFormData({ ...formData, destination: newValue })}
            renderInput={(params) => <TextField {...params} label="Destination" margin="normal" required />}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleAddDestination} sx={{ mt: 2 }}>
            Add Destination
          </Button>
          <Box sx={{ mt: 2 }}>
            {formData.destinations.map((dest, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography>{dest}</Typography>
                <IconButton onClick={() => handleRemoveDestination(index)}>
                  <RemoveIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
          <DatePicker
            label="Travel Dates"
            value={formData.dates}
            onChange={handleDatesChange}
            renderInput={(params) => <TextField {...params} margin="normal" fullWidth />}
            required
            multiple
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
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <IconButton onClick={() => handlePeopleChange(-1)} disabled={formData.people <= 1}>
              <RemoveIcon />
            </IconButton>
            <Typography>{formData.people}</Typography>
            <IconButton onClick={() => handlePeopleChange(1)}>
              <AddIcon />
            </IconButton>
          </Box>
          <FormControl fullWidth margin="normal">
            <InputLabel>Companion</InputLabel>
            <Select
              name="companion"
              value={formData.companion}
              onChange={handleChange}
            >
              <MenuItem value="couple">Couple</MenuItem>
              <MenuItem value="friends">Friends</MenuItem>
              <MenuItem value="family">Family</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Create New Trip
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default TripForm;
