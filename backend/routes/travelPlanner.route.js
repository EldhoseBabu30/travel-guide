import express from 'express';
import { travelPlan } from '../controllers/travel.controllers.js'

const router = express.Router();

router.post('/plan', travelPlan);

export default router;
