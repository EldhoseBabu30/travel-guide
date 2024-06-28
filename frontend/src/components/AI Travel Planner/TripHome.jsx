import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Typography, Box, Button } from '@mui/material';

const TripHome = () => {
  return (
    <Container className="flex flex-col items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h3" className="text-center mb-6">
          Welcome to Your Trip Planner
        </Typography>
      </motion.div>
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Box className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-[20%]">
          <NavLink to="/suggestions" className="no-underline">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="bg-blue-600 text-white p-4 rounded-lg shadow-md hover:shadow-xl"
            >
              <Typography variant="h5">Hotels</Typography>
            </motion.div>
          </NavLink>
          <NavLink to="/foodspots" className="no-underline">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="bg-red-600 text-white p-4 rounded-lg shadow-md hover:shadow-xl"
            >
              <Typography variant="h5">Food Spots</Typography>
            </motion.div>
          </NavLink>
          <NavLink to="/activities" className="no-underline">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="bg-green-600 text-white p-4 rounded-lg shadow-md hover:shadow-xl"
            >
              <Typography variant="h5">Activities</Typography>
            </motion.div>
          </NavLink>
        </Box>
      </motion.div>
      <Box className="mt-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <NavLink to="/trip-form" className="no-underline">
            <Button variant="contained" color="primary">
              Plan Another Trip
            </Button>
          </NavLink>
        </motion.div>
      </Box>
    </Container>
  );
};

export default TripHome;
