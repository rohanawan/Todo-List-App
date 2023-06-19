const mongoose = require('mongoose');
const config = require('./config');
const logger = require('./logger');

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.mongoose.url, config.mongoose.options);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

module.exports = { connectDB };
