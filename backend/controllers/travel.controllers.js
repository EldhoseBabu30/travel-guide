// controllers/travelController.js
import travelSchema from '../models/trip.model.js'

const createTravelData = async (req, res) => {
  try {
    const travelData = new Travel(req.body);
    await travelData.save();
    res.status(201).json(travelData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTravelData = async (req, res) => {
  try {
    const travelData = await Travel.find();
    res.status(200).json(travelData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTravelDataById = async (req, res) => {
  try {
    const travelData = await Travel.findById(req.params.id);
    if (!travelData) {
      return res.status(404).json({ message: 'Travel data not found' });
    }
    res.status(200).json(travelData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTravelData = async (req, res) => {
  try {
    const travelData = await Travel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!travelData) {
      return res.status(404).json({ message: 'Travel data not found' });
    }
    res.status(200).json(travelData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTravelData = async (req, res) => {
  try {
    const travelData = await Travel.findByIdAndDelete(req.params.id);
    if (!travelData) {
      return res.status(404).json({ message: 'Travel data not found' });
    }
    res.status(200).json({ message: 'Travel data deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTravelData,
  getTravelData,
  getTravelDataById,
  updateTravelData,
  deleteTravelData,
};
