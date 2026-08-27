// models/Report.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reportType: {
    type: String,
    required: true,
    default: "General Financial Statement"
  },
  fromDate: {
    type: String,
    required: true
  },
  toDate: {
    type: String,
    required: true
  },
  fundCategory: {
    type: String,
    required: true,
    default: "Masjid general fund"
  },
  format: {
    type: String,
    required: true,
    default: "PDF"
  },
  generatedBy: {
    type: String,
    required: true,
    default: "Admin"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Report', reportSchema);