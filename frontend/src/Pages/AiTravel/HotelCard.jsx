// src/components/HotelCard.jsx
import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const HotelCard = ({ hotel }) => (
  <Box p={4} border="1px solid" borderColor="orange.400" rounded="lg" mb={4}>
    <Heading as="h2" size="lg" mb={2}>{hotel.name}</Heading>
    <Text>{hotel.description}</Text>
    <Text mt={2}>{hotel.address}</Text>
    <Text mt={2}>${hotel.price} per night</Text>
  </Box>
);

export default HotelCard;
