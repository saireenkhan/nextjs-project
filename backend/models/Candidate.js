// models/Candidate.js
const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  candidateId: {
    type: String,
    required: true,
    unique: true
  },
  candidateName: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true,
    default: "Member"
  },
  election: {
    type: String,
    required: true,
    default: "General Election"
  },
  totalVotes: {
    type: Number,
    required: true,
    default: 0
  },
  votePercentage: {
    type: String, // Keeps it as a string to allow formats like "80%" or "80"
    required: true,
    default: "0%"
  },
  status: {
    type: String,
    required: true,
    default: "Active"
  },

  // ==========================================
  // WHERE THIS CANDIDATE WAS CREATED
  // ==========================================
  source: {
    type: String,
    enum: ["committee", "admin"],
    required: true,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Candidate', candidateSchema);