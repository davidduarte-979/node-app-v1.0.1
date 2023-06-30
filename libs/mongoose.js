const config = require('../config/config');
const mongoose = require('mongoose');

const getMongoDbConnection = () =>
  mongoose.connect(config.mongoDbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

module.exports = getMongoDbConnection;
