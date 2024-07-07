import express from 'express';
import { createTravelData, getTravelData, getTravelDataById, updateTravelData, deleteTravelData } from '../controllers/travel.controllers.js';

const router = express.Router();

// Route to create a new travel data entry
router.post('/', createTravelData);

// Route to get all travel data entries
router.get('/', getTravelData);

// Route to get a specific travel data entry by ID
router.get('/:id', getTravelDataById);

// Route to update a specific travel data entry by ID
router.put('/:id', updateTravelData);

// Route to delete a specific travel data entry by ID
router.delete('/:id', deleteTravelData);

export default router;
