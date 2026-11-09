const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema(
  {
    // Owner of this record
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserRole',
      required: true,
      index: true
    },

    candidateId: {
      type: String,
      required: true,
      unique: true
    },

    candidateName: {
      type: String,
      required: true,
      trim: true
    },

    position: {
      type: String,
      required: true
    },

    election: {
      type: String,
      required: true
    },

    totalVotes: {
      type: Number,
      default: 0
    },

    votePercentage: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      default: 'Active'
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

module.exports = mongoose.model('Candidate', candidateSchema);