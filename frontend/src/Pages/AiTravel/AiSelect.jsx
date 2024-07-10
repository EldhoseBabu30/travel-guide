// src/components/AiSelect.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Center, Heading, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import { TripContext } from '../AiTravel/context/TripContext';

const AiSelect = () => {
  const { tripData, setTripData } = useContext(TripContext);
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [budget, setBudget] = useState('');
  const navigate = useNavigate();

  const travelPreferences = [
    'Adventure Travel', 'Cultural Exploration', 'Beach Vacations', 'Nature Escapes',
    'Road Trips', 'Food Tourism', 'Backpacking', 'Wildlife Safaris', 'Art Galleries',
    'Historical Sites', 'Eco-Tourism'
  ];

  const handlePreferenceToggle = (preference) => {
    setSelectedPreferences(prev =>
      prev.includes(preference)
        ? prev.filter(p => p !== preference)
        : [...prev, preference]
    );
  };

  const handleContinue = () => {
    if (selectedPreferences.length === 0 || !budget) {
      alert('Please select at least one travel preference and a budget.');
    } else {
      setTripData({
        ...tripData,
        tripType: selectedPreferences.join(', '),
        budget
      });
      navigate('/schedule');
    }
  };

  return (
    <Center minH="100vh" bg="white">
      <VStack spacing={6} textAlign="center">
        <Heading as="h1" size="2xl" color="orange.400">🏖️ Select Trip Preferences and Budget 💸</Heading>
        <Wrap spacing={4} justify="center">
          {travelPreferences.map(preference => (
            <WrapItem key={preference}>
              <Button
                colorScheme={selectedPreferences.includes(preference) ? 'orange' : 'gray'}
                onClick={() => handlePreferenceToggle(preference)}
              >
                {preference}
              </Button>
            </WrapItem>
          ))}
        </Wrap>
        <VStack spacing={4}>
          {['Cheap', 'Balanced', 'Luxury', 'Flexible'].map(b => (
            <Button
              key={b}
              colorScheme={budget === b ? 'orange' : 'gray'}
              onClick={() => setBudget(b)}
            >
              {b}
            </Button>
          ))}
        </VStack>
        <Button colorScheme="orange" onClick={handleContinue}>
          👉 Continue
        </Button>
      </VStack>
    </Center>
  );
};

export default AiSelect;
