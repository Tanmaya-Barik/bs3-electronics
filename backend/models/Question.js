const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionId: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  intent: {
    type: String,
    required: true,
    index: true
  },
  question: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Question', questionSchema);
