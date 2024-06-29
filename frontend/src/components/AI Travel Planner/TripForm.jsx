import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  Paper,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Lottie from 'react-lottie';
import animationData from '../../assets/Lottiefiles/travel.json'; // Make sure to have a Lottie animation JSON file in this path

const TripForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: '',
    startDate: null,
    endDate: null,
    days: 1,
    people: '',
    focus: '',
    budget: '',
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const timeDiff = Math.abs(end - start);
      const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      setFormData({ ...formData, days: dayDiff });
    }
  }, [formData.startDate, formData.endDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date, field) => {
    setFormData({ ...formData, [field]: date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.startDate || !formData.endDate) {
      setSnackbarMessage('Please select both start and end dates.');
      setSnackbarOpen(true);
      return;
    }
    navigate('/trip-home', { state: formData });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Container className="mt-8 max-w-md">
      <Paper className="p-6 rounded-lg shadow-md">
        <Box className="text-center">
          <Lottie options={lottieOptions} height={200} width={200} />
          <Typography variant="h4" component="h1" gutterBottom className="mb-4">
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
              className="mb-4"
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={formData.startDate}
                onChange={(date) => handleDateChange(date, 'startDate')}
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="normal" required className="mb-4" />
                )}
              />
              <DatePicker
                label="End Date"
                value={formData.endDate}
                onChange={(date) => handleDateChange(date, 'endDate')}
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="normal" required className="mb-4" />
                )}
              />
            </LocalizationProvider>
            <TextField
              fullWidth
              label="Days"
              name="days"
              value={formData.days}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
              className="mb-4"
            />
            <TextField
              fullWidth
              label="People"
              name="people"
              value={formData.people}
              onChange={handleChange}
              margin="normal"
              required
              className="mb-4"
            />
            <FormControl fullWidth margin="normal" required className="mb-4">
              <InputLabel>Focus</InputLabel>
              <Select
                name="focus"
                value={formData.focus}
                onChange={handleChange}
                label="Focus"
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
              className="mb-4"
            />
            <Button type="submit" variant="contained" color="primary" className="mt-4">
              Plan Trip
            </Button>
          </form>
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
        />
      </Paper>
    </Container>
  );
};

export default TripForm;
