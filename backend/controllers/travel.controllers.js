import Travel from "../models/trip.model.js";
createTrip = async (req, res) => {
  try {
    const newTrip = new Travel(req.body);
    const savedTrip = await newTrip.save();
    res.status(201).json(savedTrip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
getAllTrips = async (req, res) => {
  try {
    const trips = await Travel.find();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};