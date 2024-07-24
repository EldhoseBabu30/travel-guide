import Travel from "../models/trip.model.js";
export const createTravelData = async (req, res) => {
  try {
    const newTrip = new Travel(req.body);
    const savedTrip = await newTrip.save();
    res.status(201).json(savedTrip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all trips
export const getTravelData = async (req, res) => {
  try {
    const trips = await Travel.find();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get trip by ID
export const getTravelDataById = async (req, res) => {
  try {
    const trip = await Travel.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a trip
export const updateTravelData = async (req, res) => {
  try {
    const updatedTrip = await Travel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTrip) return res.status(404).json({ message: "Trip not found" });
    res.json(updatedTrip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a trip
export const deleteTravelData = async (req, res) => {
  try {
    const deletedTrip = await Travel.findByIdAndDelete(req.params.id);
    if (!deletedTrip) return res.status(404).json({ message: "Trip not found" });
    res.json({ message: "Trip deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};