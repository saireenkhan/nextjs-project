const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
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
    required: true,
    default: "CNIC"
  },
  selectedCandidate: {
    type: String,
    required: true
  },
  voteTimestamp: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Vote', voteSchema);