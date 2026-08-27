const mongoose = require('mongoose');

const ratingImamSchema = new mongoose.Schema({
  ratingId: {
    type: String,
    required: true,
    unique: true
  },
  personType: {
    type: String,
    required: true
  },
  personName: {
    type: String,
    required: true
  },
  knowledge: { type: Number, default: 4 },
  akhlaq: { type: Number, default: 4 },
  punctuality: { type: Number, default: 4 },
  quality: { type: Number, default: 4 },
  behavior: { type: Number, default: 4 },
  averageRating: {
    type: String,
    required: true
  },
  feedbackBy: {
    type: String,
    default: "Anonymous"
  },
  date: {
    type: String,
    required: true
  },
  publicDisplay: {
    type: String,
    required: true,
    default: "Yes"
  },
  comment: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('RatingImam', ratingImamSchema);