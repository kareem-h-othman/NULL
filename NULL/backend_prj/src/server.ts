import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectDB } from './config/database';

const PORT = (process.env.PORT || 5000) as number;

const startServer = async () => {
  await connectDB();
  app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
  });
};

startServer(); 
