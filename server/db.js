const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/notebook';

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

module.exports = connectToMongo;
