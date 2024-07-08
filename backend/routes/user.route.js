// routes/user.route.js
import express from 'express';
import { updateUser, deleteUser, getUser, test } from '../controllers/user.controllers.js';
import { verifyToken } from '../utils/JwtHandler.js';

const router = express.Router();

router.get('/test', test);

router.put('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/:id', verifyToken, getUser);

export default router;
