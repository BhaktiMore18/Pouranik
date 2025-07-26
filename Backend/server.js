
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from "./config/mongodb.js";

import authRouter from './Routes/authRoutes.js';
import userRouter from './Routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

//  Test route
app.get('/', (req, res) => res.send('Welcome to the TODO MERN Backend!'));


//  Mount the auth router
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(PORT, '0.0.0.0', () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
