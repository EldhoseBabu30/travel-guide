import Travel from "../models/trip.model.js";

// Create a new trip
export const createTravelData = async (req, res) => {
  try {
    const newTrip = new Travel({
      ...req.body,
      creatorId: req.user.id, // Assuming req.user is populated by the verifyToken middleware
    });
    const savedTrip = await newTrip.save();
    res.status(201).json(savedTrip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all trips for the current user
export const getTravelData = async (req, res) => {
  try {
    const trips = await Travel.find({ creatorId: req.user.id }); // Filter trips by the current user's ID
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
    if (trip.creatorId !== req.user.id) return res.status(403).json({ message: "Forbidden" });
    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a trip
export const updateTravelData = async (req, res) => {
  try {
    const trip = await Travel.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    if (trip.creatorId !== req.user.id) return res.status(403).json({ message: "Forbidden" });

    const updatedTrip = await Travel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTrip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a trip
export const deleteTravelData = async (req, res) => {
  try {
    const trip = await Travel.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });
    if (trip.creatorId !== req.user.id) return res.status(403).json({ message: "Forbidden" });

    await Travel.findByIdAndDelete(req.params.id);
    res.json({ message: "Trip deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
