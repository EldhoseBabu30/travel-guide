// routes/travelPlanner.route.js
import express from 'express';
import {
  createTravelData,
  getTravelData,
  getTravelDataById,
  updateTravelData,
  deleteTravelData,
} from '../controllers/travel.controllers.js';
import { verifyToken } from '../utils/JwtHandler.js';

const router = express.Router();

router.post('/', verifyToken, createTravelData);
router.get('/', verifyToken, getTravelData);
router.delete('/:id', verifyToken, deleteTravelData);

export default router;