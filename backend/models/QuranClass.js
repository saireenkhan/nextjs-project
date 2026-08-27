const mongoose = require("mongoose");

const quranClassSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
    trim: true
  },
  teacher: {
    type: String,
    required: true,
    trim: true
  },
  timeFrom: {
    type: String,
    required: true,
    trim: true
  },
  timeTo: {
    type: String,
    required: true,
    trim: true
  },
  ageGroup: {
    type: String,
    default: "All Ages",
    trim: true
  },
  status: {
    type: String,
    default: "Open",
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("QuranClass", quranClassSchema);