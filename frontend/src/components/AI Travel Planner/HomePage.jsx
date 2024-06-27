import React from 'react';
import { Container, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import travelAnimation from '../../assets/Lottiefiles/travel.json'
import TripForm from './BudgetSelection';

const HomePage = () => {
  const navigate = useNavigate();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: travelAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
      <Lottie options={defaultOptions} height={400} width={400} />
      <Typography variant="h4" gutterBottom>Welcome to TripPlanner AI</Typography>
      <TripForm/>
      <Button variant="contained" color="primary" onClick={() => navigate('/suggestion')}>
        Plan a Trip
      </Button>
    </Container>
  );
};

export default HomePage;
