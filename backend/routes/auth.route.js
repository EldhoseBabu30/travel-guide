import express from 'express';
import { signin, signup, signOut, google} from '../controllers/auth.controllers.js';

const router = express.Router();

router.post('/sign-in', signin);
router.post('/sign-up', signup);
router.post('/google', google)

router.get('/sign-out', signOut)

export default router;
