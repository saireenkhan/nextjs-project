const mongoose = require('mongoose');

const fundSchema = new mongoose.Schema(
  {
    // Owner of this record
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserRole',
      required: true,
      index: true
    },

    fundCode: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    fundName: {
      type: String,
      required: true,
      trim: true
    },

    openingBalance: {
      type: Number,
      default: 0
    },

    currentBalance: {
      type: Number,
      default: 0
    },

    ledgerType: {
      type: String
    },

    status: {
      type: String,
      default: 'Active'
    },

    description: {
      type: String
    },

    source: {
      type: String,
      enum: ['accounts', 'admin'],
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Fund', fundSchema);