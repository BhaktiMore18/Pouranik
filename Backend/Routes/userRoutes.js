import express from 'express';
import { userauth } from '../middleware/authmiddleware.js';
import { getUserProfile } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/profile', userauth, getUserProfile);

export default userRouter;