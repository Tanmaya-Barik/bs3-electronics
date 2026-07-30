const mongoose = require('mongoose');

const chatLogSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      default: 'Customer'
    },
    userEmail: {
      type: String,
      default: 'Anonymous Visitor'
    },
    ipAddress: {
      type: String,
      default: 'Unknown IP'
    },
    userMessage: {

      type: String,
      required: true
    },
    aiReply: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('ChatLog', chatLogSchema);
