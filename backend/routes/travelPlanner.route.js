import express from 'express';
import { getTrips, createTrip, planTrip } from '../controllers/travel.controllers.js'

const router = express.Router();

router.get('/', getTrips);
router.post('/', createTrip);
router.post('/plan', planTrip);

export default router;
