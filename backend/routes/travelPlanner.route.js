import express from 'express';
import { createTravelData, getTravelData, getTravelDataById, updateTravelData, deleteTravelData } from '../controllers/travel.controllers.js'

const router = express.Router();

router.post('/', createTravelData);
router.get('/', getTravelData);
router.get('/:id', getTravelDataById);
router.put('/:id', updateTravelData);
router.delete('/:id', deleteTravelData);

module.exports = router;