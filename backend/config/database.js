const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bs3_electronics';
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host} (${conn.connection.name})`);
    return true;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.log(`⚠️ BS3 Electronics running in graceful dataset fallback mode.`);
    return false;
  }
};

const isMongoConnected = () => {
  return mongoose.connection && mongoose.connection.readyState === 1;
};

module.exports = { connectDB, isMongoConnected };
