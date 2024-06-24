import Trip from '../models/trip.model.js'
import { generateTravelPlan } from '../services/geminiService.js';

export const getTrips = async (req, res) => {
    try {
        const trips = await Trip.find();
        res.json(trips);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createTrip = async (req, res) => {
    const trip = new Trip(req.body);
    try {
        const newTrip = await trip.save();
        res.status(201).json(newTrip);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const planTrip = async (req, res) => {
    const { destination, dates, activities, people, travelWith } = req.body;
    try {
        const itinerary = await generateTravelPlan(destination, dates, activities, people, travelWith);
        res.json(itinerary);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
