const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { isMongoConnected } = require('../config/database');
const {
  getLocalUsers,
  findLocalUserByEmail,
  findLocalUserById,
  createLocalUser
} = require('../utils/userDatabase');

const generateToken = (id, name, email) => {
  return jwt.sign({ id, name, email }, process.env.JWT_SECRET || 'bs3_secret_key_123', {
    expiresIn: '30d'
  });
};

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email and password' });
    }

    // Check if user already exists in Local DB
    const existingLocal = findLocalUserByEmail(email);
    if (existingLocal) {
      return res.status(400).json({ message: 'User already exists with this email address' });
    }

    // Check if user already exists in MongoDB
    if (isMongoConnected()) {
      const userExists = await User.findOne({ email: email.toLowerCase() });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists with this email address' });
      }
    }

    // Always create in Local Database (persistent JSON storage with Bcrypt hashing)
    const localUser = createLocalUser({ name, email, password, role: 'user' });

    // Also attempt saving to MongoDB if connected
    if (isMongoConnected()) {
      try {
        await User.create({ name, email: email.toLowerCase(), password });
      } catch (mongoErr) {
        console.warn('Note: MongoDB user creation skipped:', mongoErr.message);
      }
    }

    return res.status(201).json({
      _id: localUser._id,
      name: localUser.name,
      email: localUser.email,
      role: localUser.role,
      token: generateToken(localUser._id, localUser.name, localUser.email),
      storageSource: isMongoConnected() ? 'MongoDB Atlas + Local Database' : 'Local Database (users.json)'
    });
  } catch (error) {
    console.error('Signup Error:', error);
    return res.status(500).json({ message: 'Server error during registration' });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // 1. Try checking MongoDB if connected
    if (isMongoConnected()) {
      const mongoUser = await User.findOne({ email: email.toLowerCase() }).select('+password');
      if (mongoUser && (await mongoUser.matchPassword(password))) {
        return res.json({
          _id: mongoUser._id,
          name: mongoUser.name,
          email: mongoUser.email,
          role: mongoUser.role,
          token: generateToken(mongoUser._id, mongoUser.name, mongoUser.email),
          storageSource: 'MongoDB Atlas'
        });
      }
    }

    // 2. Check local persistent database (users.json)
    const localUser = findLocalUserByEmail(email);
    if (localUser) {
      const isMatch = await bcrypt.compare(password, localUser.password);
      if (isMatch) {
        return res.json({
          _id: localUser._id,
          name: localUser.name,
          email: localUser.email,
          role: localUser.role,
          token: generateToken(localUser._id, localUser.name, localUser.email),
          storageSource: 'Local Database (users.json)'
        });
      }
    }

    return res.status(401).json({ message: 'Invalid email or password' });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ message: 'Server error during login' });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    if (isMongoConnected() && req.user?._id) {
      const mongoUser = await User.findById(req.user._id);
      if (mongoUser) {
        return res.json({
          _id: mongoUser._id,
          name: mongoUser.name,
          email: mongoUser.email,
          role: mongoUser.role,
          storageSource: 'MongoDB Atlas'
        });
      }
    }

    const localUser = findLocalUserById(req.user?._id) || findLocalUserByEmail(req.user?.email);
    if (localUser) {
      return res.json({
        _id: localUser._id,
        name: localUser.name,
        email: localUser.email,
        role: localUser.role,
        storageSource: 'Local Database (users.json)'
      });
    }

    return res.json(req.user || {
      _id: 'bs3-demo-user-id',
      name: 'BS3 Customer',
      email: 'customer@bs3electronics.in',
      role: 'user',
      storageSource: 'Fallback User'
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load profile' });
  }
};

// @desc    Get all registered users in database
// @route   GET /api/auth/users
// @access  Public
const getAllUsers = async (req, res) => {
  try {
    const localUsers = getLocalUsers().map(user => {
      const { password, ...safeUser } = user;
      return {
        ...safeUser,
        storageSource: user.storageSource || 'Local Database (users.json)'
      };
    });

    let mergedUsers = [...localUsers];

    if (isMongoConnected()) {
      try {
        const mongoUsers = await User.find({}).select('-password');
        mongoUsers.forEach(mUser => {
          const exists = mergedUsers.some(
            u => u.email.toLowerCase() === mUser.email.toLowerCase()
          );
          if (!exists) {
            mergedUsers.push({
              _id: mUser._id.toString(),
              name: mUser.name,
              email: mUser.email,
              role: mUser.role,
              createdAt: mUser.createdAt || new Date().toISOString(),
              storageSource: 'MongoDB Atlas'
            });
          }
        });
      } catch (mongoErr) {
        console.warn('Could not fetch MongoDB users:', mongoErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      count: mergedUsers.length,
      database: isMongoConnected() ? 'MongoDB Atlas + Local JSON Database' : 'Local JSON Database (backend/data/users.json)',
      users: mergedUsers
    });
  } catch (error) {
    console.error('Get All Users Error:', error);
    return res.status(500).json({ message: 'Server error loading database users' });
  }
};

module.exports = { registerUser, loginUser, getUserProfile, getAllUsers };

