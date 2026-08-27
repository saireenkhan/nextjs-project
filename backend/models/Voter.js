const mongoose = require("mongoose");

const VoterSchema = new mongoose.Schema(
  {
    voterId: { type: String, required: true, unique: true },
    voterName: { type: String, required: true },
    cnic: { type: String },
    phone: { type: String },
    verificationMethod: { type: String },
    votingStatus: { type: String, default: "Eligible" },

    // ==========================================
    // WHERE THIS VOTER RECORD WAS CREATED
    // ==========================================
    source: {
      type: String,
      enum: ["committee", "admin"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Voter", VoterSchema);