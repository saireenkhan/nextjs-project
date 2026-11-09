const mongoose = require('mongoose');

const ratingImamSchema = new mongoose.Schema(
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

    personType: {
      type: String,
      required: true
    },

    personName: {
      type: String,
      required: true,
      trim: true
    },

    knowledge: {
      type: Number,
      default: 0
    },

    akhlaq: {
      type: Number,
      default: 0
    },

    punctuality: {
      type: Number,
      default: 0
    },

    quality: {
      type: Number,
      default: 0
    },

    behavior: {
      type: Number,
      default: 0
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
    },

    publicDisplay: {
      type: Boolean,
      default: false
    },

    comment: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('RatingImam', ratingImamSchema);