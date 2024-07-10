// src/components/AiTraveller.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Center, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { TripContext } from '../AiTravel/context/TripContext';

const AiTraveller = () => {
  const { tripData, setTripData } = useContext(TripContext);
  const [travelerType, setTravelerType] = useState('');
  const [peopleCount, setPeopleCount] = useState(0);
  const navigate = useNavigate();

  const handleIncrement = () => setPeopleCount(peopleCount + 1);
  const handleDecrement = () => setPeopleCount(Math.max(0, peopleCount - 1));

  const handleContinue = () => {
    if ((travelerType === 'Family' || travelerType === 'Friends' || travelerType === 'Work') && peopleCount === 0) {
      alert('Please select the number of people traveling.');
    } else {
      setTripData({
        ...tripData,
        travelers: { type: travelerType, count: peopleCount },
      });
      navigate('/select');
    }
  };

  return (
    <Center minH="100vh" bg="white">
      <VStack spacing={6} textAlign="center">
        <Heading as="h1" size="2xl" color="orange.400">👫 Select Traveler Type 👨‍👩‍👧‍👦</Heading>
        <VStack spacing={4}>
          {['Only Me', 'A Couple', 'Family', 'Friends', 'Work'].map(type => (
            <Button
              key={type}
              colorScheme={travelerType === type ? 'orange' : 'gray'}
              onClick={() => setTravelerType(type)}
            >
              {type} {type === 'Only Me' && '👤'} {type === 'A Couple' && '❤️'} {type === 'Family' && '👨‍👩‍👧‍👦'} {type === 'Friends' && '👯‍♂️'} {type === 'Work' && '💼'}
            </Button>
          ))}
        </VStack>
        {(travelerType === 'Family' || travelerType === 'Friends' || travelerType === 'Work') && (
          <HStack>
            <Button onClick={handleDecrement} colorScheme="orange">-</Button>
            <Text>{peopleCount} {peopleCount === 1 ? 'person' : 'people'}</Text>
            <Button onClick={handleIncrement} colorScheme="orange">+</Button>
          </HStack>
        )}
        <Button colorScheme="orange" onClick={handleContinue}>
          👉 Continue
        </Button>
      </VStack>
    </Center>
  );
};

export default AiTraveller;
