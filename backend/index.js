import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';

dotenv.config();

mongoose.connect("connection url", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });


const app = express();

app.use(express.json());
app.use(cookieParser())

app.use(cors());

app.listen(3000,()=>{
    console.log("server running on port 3000"); 
}) 