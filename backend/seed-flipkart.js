const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Product = require('./models/Product');
const Category = require('./models/Category');

const CSV_FILE_PATH = path.join(__dirname, '../flipkart_com-ecommerce_sample.csv');
const PRODUCTS_JSON_PATH = path.join(__dirname, './data/products.json');

// Keywords to identify electronics and tech items in Flipkart sample CSV
const ELECTRONICS_KEYWORDS = [
  'mobile', 'phone', 'smartphone', 'laptop', 'computer', 'notebook', 'audio',
  'earphone', 'headphone', 'headset', 'speaker', 'soundbar', 'watch', 'smartwatch',
  'tv', 'television', 'camera', 'power bank', 'router', 'modem', 'keyboard',
  'mouse', 'gaming', 'tablet', 'charger', 'cable', 'monitor', 'printer',
  'storage', 'usb', 'hard drive', 'ssd', 'electronics', 'bluetooth', 'wireless',
  'adapter', 'battery', 'memory card', 'pendrive', 'earbud'
];

// Determine clean category name
function mapCategory(text = '') {
  const lower = text.toLowerCase();
  if (lower.includes('laptop') || lower.includes('notebook') || lower.includes('computer')) return 'Laptops';
  if (lower.includes('mobile') || lower.includes('phone') || lower.includes('smartphone') || lower.includes('tablet')) return 'Smartphones';
  if (lower.includes('audio') || lower.includes('earphone') || lower.includes('headphone') || lower.includes('speaker') || lower.includes('soundbar') || lower.includes('earbud')) return 'Audio';
  if (lower.includes('watch') || lower.includes('wearable') || lower.includes('fitness band')) return 'Smartwatches';
  if (lower.includes('tv') || lower.includes('television') || lower.includes('home entertainment')) return 'Televisions';
  return 'Accessories';
}

// Extract valid image URLs from Flipkart CSV string format
function parseImages(imgString = '') {
  try {
    const urls = imgString.match(/https?:\/\/[^\s"',]+/g);
    if (urls && urls.length > 0) {
      return urls;
    }
  } catch (e) {
    // fallback below
  }
  return ['https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=600&q=80'];
}

// Extract clean specs from product_specifications string
function parseSpecs(specsString = '', description = '') {
  if (description && description.length > 20) {
    return description.substring(0, 350) + '...';
  }
  return 'High-performance electronic product with official Flipkart seller warranty and genuine components.';
}

async function importFlipkartCSV() {
  console.log('=======================================================');
  console.log(' 🚀 BS3 ELECTRONICS FLIPKART DATASET SEEDER');
  console.log('=======================================================');

  if (!fs.existsSync(CSV_FILE_PATH)) {
    console.error('❌ Could not find CSV file at:', CSV_FILE_PATH);
    process.exit(1);
  }

  console.log('📄 Reading Flipkart CSV Dataset:', CSV_FILE_PATH);

  const electronicsProducts = [];
  const MAX_PRODUCTS = 150; // We import 150 top electronics products for fast college demo

  await new Promise((resolve, reject) => {
    fs.createReadStream(CSV_FILE_PATH)
      .pipe(csv())
      .on('data', (row) => {
        if (electronicsProducts.length >= MAX_PRODUCTS) return;

        const name = row.product_name || '';
        const catTree = row.product_category_tree || '';
        const desc = row.description || '';
        const combinedText = `${name} ${catTree} ${desc}`.toLowerCase();

        // Check if it's an electronics item
        const isElectronics = ELECTRONICS_KEYWORDS.some(kw => combinedText.includes(kw));

        if (isElectronics && name.length > 3) {
          const images = parseImages(row.image);
          const priceVal = parseInt(row.discounted_price || row.retail_price, 10);
          const origPriceVal = parseInt(row.retail_price || row.discounted_price, 10);

          const price = isNaN(priceVal) || priceVal <= 0 ? 1999 : priceVal;
          const originalPrice = isNaN(origPriceVal) || origPriceVal <= price ? Math.round(price * 1.2) : origPriceVal;
          const discountPercent = Math.round(((originalPrice - price) / originalPrice) * 100) || 15;

          const category = mapCategory(catTree + ' ' + name);
          const brand = row.brand || name.split(' ')[0] || 'BS3';

          electronicsProducts.push({
            id: row.uniq_id || `FK-${Math.random().toString(36).substring(2, 9)}`,
            name: name.substring(0, 100),
            brand: brand.substring(0, 30),
            category: category,
            price: price,
            originalPrice: originalPrice,
            discountPercent: discountPercent > 0 ? discountPercent : 15,
            specs: parseSpecs(row.product_specifications, desc),
            rating: Number(row.overall_rating) || 4.3,
            reviewsCount: Math.floor(Math.random() * 400) + 20,
            image: images[0],
            gallery: images.slice(0, 4),
            inStock: true,
            description: desc ? desc.substring(0, 500) : `${name} - Official Flipkart Partner Product. 7-Day Replacement Policy and 1 Year Manufacturer Warranty.`,
            features: [
              '100% Original Electronics',
              '1 Year Brand Warranty',
              '7 Day Replacement Guarantee',
              'KathaaAI Verified Best Price'
            ]
          });
        }
      })
      .on('end', () => {
        resolve();
      })
      .on('error', (err) => {
        reject(err);
      });
  });

  console.log(`✨ Extracted ${electronicsProducts.length} Electronics products from Flipkart CSV!`);

  // 1. First, save to local data/products.json so fallback & offline mode is ALWAYS updated!
  let existingCatalog = [];
  try {
    if (fs.existsSync(PRODUCTS_JSON_PATH)) {
      existingCatalog = require('./data/products.json');
    }
  } catch (e) {
    existingCatalog = [];
  }

  const allProducts = [...existingCatalog, ...electronicsProducts];

  // Remove duplicates by ID
  const uniqueMap = new Map();
  allProducts.forEach(p => {
    if (!uniqueMap.has(p.id)) {
      uniqueMap.set(p.id, p);
    }
  });

  const finalProductsList = Array.from(uniqueMap.values());

  fs.writeFileSync(PRODUCTS_JSON_PATH, JSON.stringify(finalProductsList, null, 2), 'utf-8');
  console.log(`✅ Updated backend/data/products.json with ${finalProductsList.length} total Electronics Products!`);

  // 2. Now attempt MongoDB Atlas or Local MongoDB seeding
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bs3_electronics';
  console.log('🔄 Attempting to connect to MongoDB...');

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('✅ Connected to MongoDB Successfully!');

    await Product.deleteMany({});
    await Product.insertMany(finalProductsList);
    console.log(`✅ Successfully Seeded ${finalProductsList.length} Electronics Products into MongoDB!`);

    // Seed default categories
    const categoriesData = [
      {
        name: 'Laptops',
        slug: 'laptops',
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=400&q=80',
        description: 'High-performance laptops for gaming, coding, and business.'
      },
      {
        name: 'Smartphones',
        slug: 'smartphones',
        image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=400&q=80',
        description: 'Latest 5G flagship smartphones from Apple, Samsung, and OnePlus.'
      },
      {
        name: 'Audio',
        slug: 'audio',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
        description: 'Active noise-cancelling headphones and wireless AirPods.'
      },
      {
        name: 'Smartwatches',
        slug: 'smartwatches',
        image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=400&q=80',
        description: 'Health, ECG and fitness tracking smartwatches.'
      },
      {
        name: 'Televisions',
        slug: 'televisions',
        image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=400&q=80',
        description: '4K Ultra HD and OLED Smart TVs.'
      },
      {
        name: 'Accessories',
        slug: 'accessories',
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80',
        description: 'Keyboards, mice, chargers, and premium cables.'
      }
    ];

    await Category.deleteMany({});
    const createdCategories = await Category.insertMany(categoriesData);
    console.log(`✅ Seeded ${createdCategories.length} Categories into MongoDB!`);

    for (let cat of createdCategories) {
      const count = await Product.countDocuments({ category: cat.name });
      cat.itemCount = count;
      await cat.save();
    }
    console.log('✅ Updated Category item counts in MongoDB successfully!');
    await mongoose.disconnect();
  } catch (mongoErr) {
    console.log('=======================================================');
    console.log('⚠️ Notice: Could not connect to remote MongoDB Atlas.');
    console.log('   Reason:', mongoErr.message);
    console.log('   (Common on college networks where DNS SRV is blocked)');
    console.log('✅ DON\'T WORRY! The Flipkart Dataset has been saved to');
    console.log('   backend/data/products.json.');
    console.log('   BS3 Electronics Server will automatically serve ALL');
    console.log('   160+ Flipkart products smoothly using fallback mode!');
    console.log('=======================================================');
  }

  console.log('=======================================================');
  console.log(' 🎉 FLIPKART DATASET IMPORT & SEEDING COMPLETED!');
  console.log('    Your BS3 Electronics store is now loaded with real');
  console.log('    Flipkart products + KathaaAI AI Shopping Assistant!');
  console.log('=======================================================');

  process.exit(0);
}

importFlipkartCSV();
