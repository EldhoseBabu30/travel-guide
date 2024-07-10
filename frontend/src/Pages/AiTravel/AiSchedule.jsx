// src/components/AiSchedule.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Center, Heading, VStack, HStack, Text } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TripContext } from '../AiTravel/context/TripContext';

const AiSchedule = () => {
  const { tripData, setTripData } = useContext(TripContext);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!startDate || !endDate) {
      alert('Please select start and end dates for your trip.');
    } else {
      setTripData({ ...tripData, tripDates: { startDate, endDate } });
      navigate('/hotel');
    }
  };

  return (
    <Center minH="100vh" bg="white">
      <VStack spacing={6} textAlign="center">
        <Heading as="h1" size="2xl" color="orange.400">📅 Select Trip Dates 🗓️</Heading>
        <HStack spacing={4}>
          <VStack>
            <Text>Start Date</Text>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="border border-orange-400 p-2 rounded-lg"
              wrapperClassName="w-full"
              calendarClassName="border border-orange-400"
            />
          </VStack>
          <VStack>
            <Text>End Date</Text>
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className="border border-orange-400 p-2 rounded-lg"
              wrapperClassName="w-full"
              calendarClassName="border border-orange-400"
            />
          </VStack>
        </HStack>
        <Button colorScheme="orange" onClick={handleContinue}>
          👉 Continue
        </Button>
      </VStack>
    </Center>
  );
};

export default AiSchedule;
