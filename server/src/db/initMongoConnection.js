import mongoose from 'mongoose';
import getEnvVar from '../utils/getEnvVar.js';

const initMongoConnection = async () => {
  try {
    const user = getEnvVar('MONGODB_USER');
    const pwd = getEnvVar('MONGODB_PASSWORD');
    const url = getEnvVar('MONGODB_URL');
    const db = getEnvVar('MONGODB_DB');

    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/?retryWrites=true&w=majority&appName=${db}`,
    );

    console.log('MongoDB connection successfully established!');
  } catch (error) {
    console.error('Error while setting up mongo connection:', error);
    process.exit(1);
  }
};

export default initMongoConnection;
