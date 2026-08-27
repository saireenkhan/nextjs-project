const mongoose = require("mongoose");

const islamicCalendarSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true,
    trim: true
  },
  hijriDate: {
    type: String,
    required: true,
    trim: true
  },
  gregorianDate: {
    type: String,
    required: true,
    trim: true
  },
  program: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    default: "Upcoming",
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("IslamicCalendar", islamicCalendarSchema);