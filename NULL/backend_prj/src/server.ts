import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectDB } from './config/database';
import mongoose from 'mongoose';

const PORT = (process.env.PORT || 5000) as number;
  app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const startServer = async () => {

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

// Connect to MongoDB independently without blocking the HTTP server
connectDB()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });
}
startServer(); 
