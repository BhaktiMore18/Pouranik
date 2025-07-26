import express from 'express';
import { isAunthenticated, registerUser } from '../controllers/auth.js';
import {loginUser, logoutUser} from '../controllers/LoginController.js';
import {  userauth } from '../middleware/authmiddleware.js';

const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);  
authRouter.post('/logout', logoutUser);
// authRouter.post('/sendVerifyotp',userauth, sendverifyEmail);
// authRouter.post('/verifyotp', userauth, verifyEmail);
authRouter.get('/is-auth', userauth, isAunthenticated);

export default authRouter;