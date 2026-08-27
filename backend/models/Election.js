const mongoose = require("mongoose");

const electionSchema = new mongoose.Schema(
  {
    electionId: {
      type: String,
      required: true,
      unique: true,
    },

    electionTitle: {
      type: String,
      required: true,
    },

    electionType: {
      type: String,
      required: true,
      default: "General",
    },

    voteType: {
      type: String,
      required: true,
      default: "Single Choice",
    },

    status: {
      type: String,
      required: true,
      default: "Scheduled",
    },

    resultVisibility: {
      type: String,
      required: true,
      default: "Public",
    },

    // IMPORTANT:
    // This tells us which panel created the election.
    source: {
      type: String,
      enum: ["admin", "committee"],
      required: true,
    },

    // Optional but useful for committee/admin elections
    startTime: {
      type: String,
    },

    endTime: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Election", electionSchema);