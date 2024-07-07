import express from 'express';
import { updateUser,test, deleteUser,getUser } from '../controllers/user.controllers.js';
import { verifyToken } from '../utils/VerifyUser.js';

const router = express.Router();

router.get('/test', test);

router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/:id', verifyToken, getUser);

export default router;
