const mongoose = require('mongoose');

const uri = "mongodb://KathaaAiBot:KathaaAiBot%402407@ac-qgrtakh-shard-00-00.adzcsod.mongodb.net:27017,ac-qgrtakh-shard-00-01.adzcsod.mongodb.net:27017,ac-qgrtakh-shard-00-02.adzcsod.mongodb.net:27017/bs3_electronics?ssl=true&replicaSet=atlas-upogjn-shard-0&authSource=admin&retryWrites=true&w=majority";

console.log('Testing direct MongoDB Atlas connection...');
mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('✅ SUCCESSFULLY CONNECTED TO MONGODB ATLAS!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ MongoDB Atlas Error:', err.message);
    process.exit(1);
  });
