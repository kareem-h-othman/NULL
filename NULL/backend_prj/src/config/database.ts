import mongoose from 'mongoose';
import dns from 'dns';
export const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_URI as string;
    dns.setServers(['8.8.8.8', '1.1.1.1']);
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};


