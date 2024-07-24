import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import travelPlannerRouter from './routes/travelPlanner.route.js';  // Uncomment this line

dotenv.config();

mongoose.connect(process.env.MONGO)
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Allow requests from your frontend's origins
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
}));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/travelplanner', travelPlannerRouter);  // Add this line

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ success: false, statusCode, message });
});
