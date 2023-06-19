const mongoose = require('mongoose');
const config = require('../config/config');

mongoose.set('strictQuery', false);
const connect = async () => {
  await mongoose.connect(config.mongoose.url, config.mongoose.options);
};

const disconnect = async () => {
  await mongoose.disconnect(config.mongoose.url);
};

module.exports = {
  connect,
  disconnect,
};
