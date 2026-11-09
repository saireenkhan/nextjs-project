const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema(
  {
    // Owner of this vote record
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserRole',
      required: true,
      index: true
    },

    voteId: {
      type: String,
      required: true,
      unique: true
    },

    election: {
      type: String,
      required: true
    },

    voterIdentifier: {
      type: String,
      required: true
    },

    verificationMethod: {
      type: String,
      required: true
    },

    selectedCandidate: {
      type: String,
      required: true
    },

    voteTimestamp: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Vote', voteSchema);