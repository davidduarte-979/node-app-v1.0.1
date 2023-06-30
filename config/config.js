require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  dbUser: process.env.POSGRESQL_DB_USER,
  dbPassword: process.env.POSGRESQL_DB_PASSWORD,
  dbHost: process.env.POSGRESQL_DB_HOST,
  dbName: process.env.POSGRESQL_DB_NAME,
  dbPort: process.env.POSGRESQL_DB_PORT,
  mongoDbUri: process.env.MONGO_URI,
};

module.exports = config;
