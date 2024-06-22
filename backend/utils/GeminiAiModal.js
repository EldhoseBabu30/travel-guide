import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY; // Replace with your actual Gemini API key
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash', // Adjust the model as per your requirements
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

export const generateTravelPlan = async (destination, dates, activities, people, travelWith) => {
  const chatSession = model.startChat({
    generationConfig,
  });

  const userInput = `Destination: ${destination}\nDates: ${dates}\nActivities: ${activities.join(', ')}\nPeople: ${people}\nTraveling with: ${travelWith}`;

  const response = await chatSession.generateResponse(userInput);

  return response;
};
