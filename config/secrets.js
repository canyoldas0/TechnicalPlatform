import dotenv from 'dotenv';

dotenv.config();

export const config = {
  dbKey: process.env.DB_KEY,
  jwtSecret: process.env.JWT_KEY,
};
