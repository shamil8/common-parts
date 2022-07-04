import { config, } from 'dotenv';

config();

export default {
  isLocal: process.env.LOCAL === 'true',
  mongoLink: process.env.MONGO_LINK || 'mongodb://localhost:27017/earn_db',
};
