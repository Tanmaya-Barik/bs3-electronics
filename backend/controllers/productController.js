const Product = require('../models/Product');
const Category = require('../models/Category');
const productsData = require('../data/products.json');
const { isMongoConnected } = require('../config/database');

// @desc    Get all products with search, filtering, sorting, and pagination
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const {
      keyword = '',
      category = '',
      minPrice = 0,
      maxPrice = 1000000,
      sortBy = 'newest',
      page = 1,
      limit = 9
    } = req.query;

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 9;

    if (isMongoConnected()) {
      let query = {};

      // Search keyword matching name, brand, description
      if (keyword) {
        query.$or = [
          { name: { $regex: keyword, $options: 'i' } },
          { brand: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } }
        ];
      }

      // Category filter
      if (category && category !== 'All') {
        query.category = category;
      }

      // Price filter
      query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };

      // Sorting
      let sortObj = { createdAt: -1 };
      if (sortBy === 'price-asc') sortObj = { price: 1 };
      else if (sortBy === 'price-desc') sortObj = { price: -1 };
      else if (sortBy === 'rating-desc') sortObj = { rating: -1 };

      const total = await Product.countDocuments(query);
      const products = await Product.find(query)
        .sort(sortObj)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum);

      return res.json({
        products,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
        total
      });
    } else {
      // Graceful offline JSON dataset filtering & pagination
      let filtered = [...productsData];

      if (keyword) {
        const kw = keyword.toLowerCase();
        filtered = filtered.filter(p =>
          p.name.toLowerCase().includes(kw) ||
          p.brand.toLowerCase().includes(kw) ||
          p.description.toLowerCase().includes(kw)
        );
      }

      if (category && category !== 'All') {
        filtered = filtered.filter(p => p.category === category);
      }

      filtered = filtered.filter(p => p.price >= Number(minPrice) && p.price <= Number(maxPrice));

      if (sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price);
      else if (sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price);
      else if (sortBy === 'rating-desc') filtered.sort((a, b) => b.rating - a.rating);

      const total = filtered.length;
      const paginated = filtered.slice((pageNum - 1) * limitNum, pageNum * limitNum);

      return res.json({
        products: paginated,
        page: pageNum,
        pages: Math.ceil(total / limitNum) || 1,
        total
      });
    }
  } catch (error) {
    console.error('getProducts Error:', error);
    return res.status(500).json({ message: 'Server error fetching products' });
  }
};

// @desc    Get single product by ID (supports MongoDB _id or custom ID like bs3-lap-01)
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isMongoConnected()) {
      let product = await Product.findOne({ id });
      if (!product && id.match(/^[0-9a-fA-F]{24}$/)) {
        product = await Product.findById(id);
      }
      if (product) {
        return res.json(product);
      }
    }

    // Fallback to offline json catalog
    const localProduct = productsData.find(p => p.id === id || p._id === id);
    if (localProduct) {
      return res.json(localProduct);
    }

    return res.status(404).json({ message: 'Product not found in BS3 Electronics catalog' });
  } catch (error) {
    console.error('getProductById Error:', error);
    return res.status(500).json({ message: 'Error loading product details' });
  }
};

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    if (isMongoConnected()) {
      const categories = await Category.find({});
      if (categories && categories.length > 0) {
        return res.json(categories);
      }
    }

    // Default static categories
    return res.json([
      { name: 'Laptops', slug: 'laptops', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=400&q=80', description: 'Gaming & Ultrabooks', itemCount: 2 },
      { name: 'Smartphones', slug: 'smartphones', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=400&q=80', description: '5G Flagship Phones', itemCount: 3 },
      { name: 'Audio', slug: 'audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80', description: 'Headphones & TWS AirPods', itemCount: 3 },
      { name: 'Smartwatches', slug: 'smartwatches', image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=400&q=80', description: 'Fitness & Health Watches', itemCount: 2 },
      { name: 'Televisions', slug: 'televisions', image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=400&q=80', description: '4K Smart OLED TVs', itemCount: 1 },
      { name: 'Accessories', slug: 'accessories', image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=400&q=80', description: 'Wireless Mice & Gear', itemCount: 1 }
    ]);
  } catch (error) {
    return res.status(500).json({ message: 'Error loading categories' });
  }
};

module.exports = { getProducts, getProductById, getCategories };
