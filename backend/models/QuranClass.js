const mongoose = require('mongoose');

const quranClassSchema = new mongoose.Schema(
  {
    // Owner of this record
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserRole',
      required: true,
      index: true
    },

    className: {
      type: String,
      required: true,
      trim: true
    },

    teacher: {
      type: String,
      required: true,
      trim: true
    },

    timeFrom: {
      type: String,
      required: true
    },

    timeTo: {
      type: String,
      required: true
    },

    ageGroup: {
      type: String,
      required: true
    },

    status: {
      type: String,
      default: 'Active'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('QuranClass', quranClassSchema);