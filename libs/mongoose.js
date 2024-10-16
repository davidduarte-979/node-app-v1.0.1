import config from '../config/config.js';
import mongoose from 'mongoose';

const getMongoDbConnection = () =>
  mongoose.connect(config.mongoDbUri);

export default getMongoDbConnection;
