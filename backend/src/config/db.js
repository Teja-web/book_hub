import mongoose from 'mongoose';

export async function connectDb() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error('MONGODB_URI is not set');
  }

  mongoose.set('strictQuery', true);
  await mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 10000,
  });
  // eslint-disable-next-line no-console
  console.log('Connected to MongoDB');
}


