const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Product = require('./models/Product');
const Category = require('./models/Category');
const productsData = require('./data/products.json');

const categoriesData = [
  {
    name: 'Laptops',
    slug: 'laptops',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=400&q=80',
    description: 'High-performance laptops for gaming, coding, and business.',
    itemCount: 2
  },
  {
    name: 'Smartphones',
    slug: 'smartphones',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=400&q=80',
    description: 'Latest 5G flagship smartphones from Apple, Samsung, and OnePlus.',
    itemCount: 3
  },
  {
    name: 'Audio',
    slug: 'audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
    description: 'Active noise-cancelling headphones and wireless AirPods.',
    itemCount: 3
  },
  {
    name: 'Smartwatches',
    slug: 'smartwatches',
    image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=400&q=80',
    description: 'Health, ECG and fitness tracking smartwatches.',
    itemCount: 2
  },
  {
    name: 'Televisions',
    slug: 'televisions',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=400&q=80',
    description: '4K Ultra HD and OLED Smart TVs.',
    itemCount: 1
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=400&q=80',
    description: 'High-precision wireless mice, monitors, and keyboards.',
    itemCount: 1
  }
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bs3_electronics';
    console.log('Connecting to MongoDB database for seeding...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB.');

    console.log('Clearing old products and categories collections...');
    await Product.deleteMany({});
    await Category.deleteMany({});

    console.log(`Seeding ${productsData.length} products...`);
    await Product.insertMany(productsData);

    console.log(`Seeding ${categoriesData.length} categories...`);
    await Category.insertMany(categoriesData);

    console.log('🎉 Successfully seeded BS3 Electronics MongoDB database!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error during seeding:', err.message);
    console.log('Note: If offline, BS3 Electronics automatically uses data/products.json fallback.');
    process.exit(1);
  }
};

seedDB();
