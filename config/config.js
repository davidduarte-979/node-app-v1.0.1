import dotenv from "dotenv";
dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  host: process.env.HOST,
  protocol: process.env.PROTOCOL,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  mongoDbUri: process.env.MONGO_URI,
  jwtSecretToken: process.env.JWT_SECRET_TOKEN,
  emailUser: process.env.EMAIL_USER,
  emailPassword: process.env.EMAIL_PASSWORD,
};

export default config;
