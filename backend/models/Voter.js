const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema(
  {
    // Owner of this record
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserRole',
      required: true,
      index: true
    },

    voterId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    voterName: {
      type: String,
      required: true,
      trim: true
    },

    cnic: {
      type: String,
      required: true,
      trim: true
    },

    phone: {
      type: String,
      trim: true
    },

    verificationMethod: {
      type: String,
      required: true
    },

    votingStatus: {
      type: String,
      default: 'Not Voted'
    },

    source: {
      type: String,
      enum: ['committee', 'admin'],
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Voter', voterSchema);