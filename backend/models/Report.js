const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    // Owner of this report
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserRole',
      required: true,
      index: true
    },

    reportType: {
      type: String,
      required: true
    },

    fromDate: {
      type: Date,
      required: true
    },

    toDate: {
      type: Date,
      required: true
    },

    fundCategory: {
      type: String
    },

    format: {
      type: String,
      required: true
    },

    generatedBy: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Report', reportSchema);