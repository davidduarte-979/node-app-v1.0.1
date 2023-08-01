import config from '../config/config.js';
import mongoose from 'mongoose';

const getMongoDbConnection = () =>
  mongoose.connect(config.mongoDbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

export default getMongoDbConnection;
