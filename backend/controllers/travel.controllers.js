// controllers/generateItineraryController.js

import axios from "axios";

const travelController = async (req, res) => {
  const { destination, duration, preferences } = req.body;

  // Replace with your actual Google Gemini API endpoint and key
  const googleGeminiApiUrl = 'https://api.google.com/gemini/plan';
  const apiKey = 'AIzaSyBcqgvhFPrI5WlRxVbRZpmqki34rbc0lq8';

  try {
    const response = await axios.post(
      googleGeminiApiUrl,
      {
        destination,
        duration,
        preferences
      },
      {
        headers: {
          'Authorization': `Bearer ${AIzaSyBcqgvhFPrI5WlRxVbRZpmqki34rbc0lq8}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error generating itinerary:', error);
    res.status(500).json({ error: 'Failed to generate itinerary' });
  }
};

module.exports = {
  travelController
};
