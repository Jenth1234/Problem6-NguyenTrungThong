const mongoose = require('mongoose');
require('dotenv').config(); 

const dbConnect = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    // Kết nối tới MongoDB
    await mongoose.connect(uri, {
 
    });

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); 
  }
};

module.exports = dbConnect;
