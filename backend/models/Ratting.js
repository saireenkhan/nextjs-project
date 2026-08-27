const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  ratingId: {
    type: String,
    required: true,
    unique: true
  },
  panel: {
    type: String,
    required: true,
    default: "muqtadi" // Tracks which panel created this record
  },
  personType: {
    type: String,
    required: true,
    default: "Imam"
  },
  personName: {
    type: String,
    required: true
  },
  averageRating: {
    type: String,
    required: true,
    default: "5.0"
  },
  feedbackBy: {
    type: String,
    required: true,
    default: "Anonymous"
  },
  date: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Rating', ratingSchema);