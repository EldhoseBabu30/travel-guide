import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyBtLgAkzdaEGVytlLaKlZvGW3LtYTeM8z8";
const genAI = new GoogleGenerativeAI(API_KEY);

const validateTripDetails = (tripData) => {
  // ... (keep existing validation logic)
};

const formatDateRange = (startDate, endDate) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return `${new Date(startDate).toLocaleDateString(undefined, options)} to ${new Date(endDate).toLocaleDateString(undefined, options)}`;
};

const createPrompt = (tripData) => {
  return `Generate a Travel Plan for Location: ${tripData.destination}, for ${formatDateRange(tripData.tripDates.startDate, tripData.tripDates.endDate)} for ${tripData.travelers.type} - ${tripData.travelers.count} ${tripData.travelers.count === 1 ? 'person' : 'people'} with a ${tripData.budget} budget. Include the following details:
1. Flight details: Flight Price with Booking url
2. Hotels options: List with ${tripData.accommodation.name}, ${tripData.accommodation.location} - ${tripData.accommodation.roomType}, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions
3. Dining options: ${tripData.dining.meals.join(', ')}, Dietary Requirements: ${tripData.dining.dietaryRequirements || 'None'}, Dining address, Price, Dining image url, geo coordinates, rating, descriptions
4. Places to visit nearby: placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel
5. Daily itinerary: Plan for each day from ${formatDateRange(tripData.tripDates.startDate, tripData.tripDates.endDate)} with best time to visit
IMPORTANT: Provide the response as a valid JSON object. Ensure all property names and string values are enclosed in double quotes. Do not include any explanations or markdown formatting outside the JSON object. All monetary values should be in INR and represented as strings (e.g., "₹1000").`;
};

const extractJSONFromText = (text) => {
  const jsonRegex = /{[\s\S]*}/;
  const match = text.match(jsonRegex);
  if (match) {
    return match[0];
  }
  throw new Error("Valid JSON object not found in the response");
};

const cleanJSONString = (jsonString) => {
  return jsonString.trim();
};

const parseResponse = (rawResponse) => {
  try {
    let jsonString = extractJSONFromText(rawResponse);
    console.log("Extracted JSON string:", jsonString);  // Log extracted JSON string
    jsonString = cleanJSONString(jsonString);
    console.log("Cleaned JSON string:", jsonString);  // Log cleaned JSON string
    const parsedData = JSON.parse(jsonString);
    if (parsedData && parsedData.travelPlan) {
      return parsedData.travelPlan;
    } else {
      console.error('Unexpected JSON response format:', parsedData);
      return null;
    }
  } catch (error) {
    console.error("JSON parsing error:", error);
    return null;
  }
};

export const getItinerary = async (tripData) => {
  let rawResponse = '';
  try {
    validateTripDetails(tripData);
    const prompt = createPrompt(tripData);
    console.log("Generated prompt:", prompt);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    rawResponse = await response.text();
    console.log("Raw API response:", rawResponse);
    const structuredData = parseResponse(rawResponse);
    if (!structuredData) {
      throw new Error("Failed to parse API response");
    }
    return { success: true, data: structuredData, rawResponse: rawResponse };
  } catch (error) {
    console.error("API operation error:", error);
    return { success: false, error: error.message, rawResponse: rawResponse };
  }
};
