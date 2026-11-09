const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema(
  {
    // Owner of this record
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserRole',
      required: true,
      index: true
    },

    ratingId: {
      type: String,
      required: true,
      unique: true
    },

    panel: {
      type: String,
      default: 'muqtadi'
    },

    personType: {
      type: String,
      required: true
    },

    personName: {
      type: String,
      required: true,
      trim: true
    },

    averageRating: {
      type: Number,
      default: 0
    },

    feedbackBy: {
      type: String
    },

    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Rating', ratingSchema);