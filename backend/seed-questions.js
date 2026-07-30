const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Question = require('./models/Question');

const QUESTIONS_DIR = path.join(__dirname, '../questions');
const QUESTIONS_JSON_PATH = path.join(__dirname, './data/questions.json');

async function parseCSVFile(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        if (data && data.question && data.intent) {
          results.push({
            questionId: parseInt(data.id, 10) || results.length + 1,
            category: (data.category || data.intent || 'miscellaneous').trim(),
            intent: (data.intent || 'miscellaneous').trim(),
            question: data.question.trim()
          });
        }
      })
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
}

async function seedQuestions() {
  console.log('=======================================================');
  console.log(' 🤖 BS3 ELECTRONICS — SEEDING QUESTIONS & INTENTS DATASET');
  console.log('=======================================================');

  try {
    if (!fs.existsSync(QUESTIONS_DIR)) {
      console.error(`❌ Questions directory not found at: ${QUESTIONS_DIR}`);
      process.exit(1);
    }

    const files = fs.readdirSync(QUESTIONS_DIR).filter(file => file.endsWith('.csv'));
    console.log(`📂 Found ${files.length} CSV files in questions directory...`);

    let allQuestions = [];
    const intentCounts = {};

    for (const file of files) {
      const filePath = path.join(QUESTIONS_DIR, file);
      const items = await parseCSVFile(filePath);
      allQuestions = allQuestions.concat(items);

      const intentName = file.replace('.csv', '');
      intentCounts[intentName] = items.length;
      console.log(`   ✔ Loaded ${items.length.toString().padStart(4, ' ')} questions from ${file}`);
    }

    console.log('\n-------------------------------------------------------');
    console.log(`✨ Total Questions Parsed: ${allQuestions.length}`);
    console.log('-------------------------------------------------------');

    // 1. Save local JSON fallback dataset for KathaaAI
    fs.writeFileSync(QUESTIONS_JSON_PATH, JSON.stringify(allQuestions, null, 2), 'utf8');
    console.log(`✅ Saved ${allQuestions.length} questions to local fallback dataset: ${path.relative(process.cwd(), QUESTIONS_JSON_PATH)}`);

    // 2. Attempt to seed MongoDB Atlas / Local MongoDB
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bs3_electronics';
    console.log(`\n⏳ Connecting to MongoDB to seed questions collection...`);

    let mongoConnected = false;
    try {
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
      mongoConnected = true;
      console.log(`✅ Connected to MongoDB: ${mongoose.connection.host}`);
    } catch (err) {
      console.log(`⚠️ Could not connect to MongoDB (${err.message}).`);
      console.log(`✅ Local dataset fallback (${path.basename(QUESTIONS_JSON_PATH)}) is ready and will be used by KathaaAI.`);
    }

    if (mongoConnected) {
      await Question.deleteMany({});
      console.log(`🗑️ Cleared old questions collection in MongoDB.`);

      const batchSize = 500;
      for (let i = 0; i < allQuestions.length; i += batchSize) {
        const batch = allQuestions.slice(i, i + batchSize);
        await Question.insertMany(batch);
      }
      console.log(`🎉 Successfully seeded ${allQuestions.length} questions into MongoDB 'questions' collection!`);
      await mongoose.disconnect();
    }

    console.log('\n=======================================================');
    console.log(' 🤖 KATHAA-AI DATASET SEEDING COMPLETE');
    console.log('=======================================================\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during questions seeding:', error);
    process.exit(1);
  }
}

seedQuestions();
