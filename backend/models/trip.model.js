// models/Travel.js
import mongoose from 'mongoose';

const travelSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true,
  },
  travelers: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  preferences: {
    type: [String],
    required: true,
  },
  budget: {
    type: String,
    required: true,
  },
  destinationImage: {
    type: String,
  },
});

module.exports = mongoose.model('Travel', travelSchema);
