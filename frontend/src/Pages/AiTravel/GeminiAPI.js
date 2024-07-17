import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyBtLgAkzdaEGVytlLaKlZvGW3LtYTeM8z8";
const genAI = new GoogleGenerativeAI(API_KEY);

const validateTripDetails = (tripData) => {
  const errors = [];

  if (!tripData.destination || typeof tripData.destination !== 'string' || tripData.destination.trim() === '') {
    errors.push("Destination is required and must be a non-empty string");
  }

  if (!tripData.tripDates || typeof tripData.tripDates !== 'object') {
    errors.push("Trip dates are required");
  } else {
    const { startDate, endDate } = tripData.tripDates;
    if (!startDate || !Date.parse(startDate)) {
      errors.push("Valid start date is required");
    }
    if (!endDate || !Date.parse(endDate)) {
      errors.push("Valid end date is required");
    }
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      errors.push("Start date must be before end date");
    }
  }

  if (!tripData.travelers || typeof tripData.travelers !== 'object') {
    errors.push("Traveler information is required");
  } else {
    const { type, count } = tripData.travelers;
    if (!type || typeof type !== 'string' || type.trim() === '') {
      errors.push("Traveler type is required and must be a non-empty string");
    }
    if (!count || typeof count !== 'number' || count < 1) {
      errors.push("Traveler count must be a positive number");
    }
  }

  if (!tripData.budget || typeof tripData.budget !== 'string' || tripData.budget.trim() === '') {
    errors.push("Budget is required and must be a non-empty string");
  }

  if (tripData.accommodation) {
    const { name, location, roomType } = tripData.accommodation;
    if (typeof name !== 'string' || name.trim() === '') {
      errors.push("Accommodation name must be a non-empty string");
    }
    if (typeof location !== 'string' || location.trim() === '') {
      errors.push("Accommodation location must be a non-empty string");
    }
    if (typeof roomType !== 'string' || roomType.trim() === '') {
      errors.push("Room type must be a non-empty string");
    }
  }

  if (tripData.dining) {
    const { meals, dietaryRequirements } = tripData.dining;
    if (meals && (!Array.isArray(meals) || meals.length === 0)) {
      errors.push("If provided, dining meals must be a non-empty array");
    }
    if (dietaryRequirements && typeof dietaryRequirements !== 'string') {
      errors.push("Dietary requirements must be a string");
    }
  }

  if (errors.length > 0) {
    throw new Error("Validation failed: " + errors.join("; "));
  }
};

const formatDateRange = (startDate, endDate) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formatDate = (date) => {
    if (!date) return 'Unknown date';
    return new Date(date).toLocaleDateString(undefined, options);
  };
  return `${formatDate(startDate)} to ${formatDate(endDate)}`;
};

const createPrompt = (tripData) => {
  const destination = tripData.destination || 'Unknown destination';
  const startDate = tripData.tripDates?.startDate || 'Unknown start date';
  const endDate = tripData.tripDates?.endDate || 'Unknown end date';
  const travelerType = tripData.travelers?.type || 'Unknown traveler type';
  const travelerCount = tripData.travelers?.count || 1;
  const budget = tripData.budget || 'Unknown budget';
  const accommodationName = tripData.accommodation?.name || 'Unknown accommodation';
  const accommodationLocation = tripData.accommodation?.location || 'Unknown location';
  const accommodationRoomType = tripData.accommodation?.roomType || 'Unknown room type';
  const diningMeals = tripData.dining?.meals?.join(', ') || 'No specific meals';
  const diningDietaryRequirements = tripData.dining?.dietaryRequirements || 'None';

  return `Generate a Travel Plan for Location: ${destination}, for ${formatDateRange(startDate, endDate)} for ${travelerType} - ${travelerCount} ${travelerCount === 1 ? 'person' : 'people'} with a ${budget} budget. Include the following details:
1. Flight details: Flight Price with Booking url
2. Hotels options: List with ${accommodationName}, ${accommodationLocation} - ${accommodationRoomType}, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions
3. Dining options: ${diningMeals}, Dietary Requirements: ${diningDietaryRequirements}, Dining address, Price, Dining image url, geo coordinates, rating, descriptions
4. Places to visit nearby: placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel
5. Daily itinerary: Plan for each day from ${formatDateRange(startDate, endDate)} with best time to visit
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
  return jsonString.trim().replace(/(\r\n|\n|\r|\t)/gm, "");
};

const parseResponse = (rawResponse) => {
  try {
    let jsonString = extractJSONFromText(rawResponse);
    console.log("Extracted JSON string:", jsonString);
    jsonString = cleanJSONString(jsonString);
    console.log("Cleaned JSON string:", jsonString);
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
    console.log("Trip data received:", JSON.stringify(tripData, null, 2));
    validateTripDetails(tripData);
    const prompt = createPrompt(tripData);
    console.log("Generated prompt:", prompt);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    rawResponse = await response.text();
    console.log("Raw API response:", rawResponse);

    // Debugging log before parsing
    console.log("Attempting to parse the raw response");
    const structuredData = parseResponse(rawResponse);

    // Check and log structured data
    console.log("Structured data after parsing:", structuredData);

    if (!structuredData) {
      throw new Error("Failed to parse API response. Raw response: " + rawResponse.substring(0, 200) + "...");
    }
    return { success: true, data: structuredData, rawResponse: rawResponse };
  } catch (error) {
    console.error("API operation error:", error);
    return { 
      success: false, 
      error: error.message, 
      rawResponse: rawResponse.substring(0, 200) + "..." 
    };
  }
};
