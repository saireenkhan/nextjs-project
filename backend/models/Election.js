const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema(
  {
    // Owner of this election
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserRole',
      required: true,
      index: true
    },

    electionId: {
      type: String,
      required: true,
      unique: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    type: {
      type: String,
      required: true
    },

    voteType: {
      type: String,
      required: true
    },

    status: {
      type: String,
      required: true
    },

    resultVisibility: {
      type: String
    },

    source: {
      type: String,
      enum: ['admin', 'committee'],
      required: true
    },

    startTime: {
      type: Date,
      required: true
    },

    endTime: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Election', electionSchema);