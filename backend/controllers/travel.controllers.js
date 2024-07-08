// controllers/travelController.js
import Travel from '../models/trip.model.js';

export const createTravelData = async (req, res) => {
  try {
    const travelData = new Travel({
      userId: req.user.id,
      ...req.body,
    });
    await travelData.save();
    res.status(201).json(travelData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getTravelData = async (req, res) => {
  try {
    const travelData = await Travel.find({ userId: req.user.id });
    res.status(200).json(travelData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTravelDataById = async (req, res) => {
  try {
    const travelData = await Travel.findOne({ _id: req.params.id, userId: req.user.id });
    if (!travelData) {
      return res.status(404).json({ message: 'Travel data not found' });
    }
    res.status(200).json(travelData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTravelData = async (req, res) => {
  try {
    const travelData = await Travel.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!travelData) {
      return res.status(404).json({ message: 'Travel data not found' });
    }
    res.status(200).json(travelData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTravelData = async (req, res) => {
  try {
    const travelData = await Travel.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!travelData) {
      return res.status(404).json({ message: 'Travel data not found' });
    }
    res.status(200).json({ message: 'Travel data deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
