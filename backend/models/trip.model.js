// models/Travel.js
import mongoose from 'mongoose';

const travelSchema = new mongoose.Schema({
  destination: String,
  destinationCoordinates: [Number],
  travelers: {
    type: { type: String },
    count: Number
  },
  tripDates: {
    startDate: Date,
    endDate: Date
  },
  tripType: String,
  budget: String,
  accommodation: {
    name: String,
    location: String,
    roomType: String
  },
  dining: {
    name: String,
    location: String,
    cuisine: String,
    mealTime: String
  }

});

const Travel = mongoose.model('Travel', travelSchema);

export default Travel;