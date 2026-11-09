const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    // Owner of this event
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserRole',
      required: true,
      index: true
    },

    event: {
      type: String,
      required: true,
      trim: true
    },

    date: {
      type: Date,
      required: true
    },

    time: {
      type: String,
      required: true
    },

    speaker: {
      type: String,
      required: true
    },

    topic: {
      type: String,
      required: true
    },

    status: {
      type: String,
      default: 'Scheduled'
    },

    sourceEventKhateebId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EventKhateeb'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Event', eventSchema);