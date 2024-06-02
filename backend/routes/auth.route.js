import express from 'express';
import { signin, signup } from '../controllers/auth.controllers.js';

const router = express.Router();

router.post('/sign-in', signin);
router.post('/sign-up', signup);

export default router;
