const mongoose = require('mongoose');
const { callGeminiAPI } = require('../config/gemini');
const ChatLog = require('../models/ChatLog');

// @desc    Handle KathaaAI chatbot message via Google Gemini API
// @route   POST /api/chat
// @access  Public
const handleChatMessage = async (req, res) => {
  try {
    const { message, chatHistory = [], userName = 'Customer', userEmail = 'Anonymous Visitor' } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({
        error: 'Empty message',
        reply: 'Please enter a message or ask KathaaAI about our electronics products, warranty, or delivery policies.'
      });
    }

    const reply = await callGeminiAPI(message, chatHistory);

    // Extract client IP address from headers or socket connection
    const ipAddress = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || '127.0.0.1';

    // Save conversation to MongoDB Atlas if connected
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      try {
        await ChatLog.create({
          userName,
          userEmail,
          ipAddress,
          userMessage: message,
          aiReply: reply
        });
      } catch (mongoErr) {
        console.warn('Note: MongoDB chat log creation skipped:', mongoErr.message);
      }
    }


    return res.status(200).json({
      reply
    });
  } catch (error) {
    console.error('KathaaAI Chat Controller Error:', error.message);
    return res.status(500).json({
      error: 'Server Error',
      reply: "I apologize, but I am momentarily experiencing high server traffic. Please ask again in just a moment or explore our Featured Electronics below!"
    });
  }
};

module.exports = {
  handleChatMessage
};
