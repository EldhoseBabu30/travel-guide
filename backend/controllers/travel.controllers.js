import { generateTravelPlan } from '../utils/GeminiAiModal.js';

export const travelPlan = async (req, res, next) => {
  try {
    const { destination, dates, activities, people, travelWith } = req.body;

    // Call Gemini AI service to generate travel plan based on user input
    const recommendations = await generateTravelPlan(destination, dates, activities, people, travelWith);

    // Construct the travel plan response
    const travelPlan = {
      destination,
      dates,
      activities,
      people,
      travelWith,
      recommendations,
    };

    res.json(travelPlan);
  } catch (error) {
    console.error('Error details:', error);
    next(error); // Pass error to error handling middleware
  }
};
