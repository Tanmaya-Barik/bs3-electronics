const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { isMongoConnected } = require('../config/database');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'bs3_secret_key_123');

      if (isMongoConnected()) {
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        // Fallback demo user if MongoDB is disconnected
        req.user = { _id: decoded.id, name: decoded.name || 'BS3 Customer', email: decoded.email || 'user@bs3electronics.in', role: 'user' };
      }

      return next();
    } catch (error) {
      console.error('JWT Token Verification Failed:', error.message);
      return res.status(401).json({ message: 'Not authorized, token failed or expired' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no authorization token provided' });
  }
};

module.exports = { protect };
