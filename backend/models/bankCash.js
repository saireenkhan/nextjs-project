const mongoose = require('mongoose');

const bankCashSchema = new mongoose.Schema(
  {
    // Owner of this record
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserRole',
      required: true,
      index: true
    },

    transactionId: {
      type: String,
      required: true,
      unique: true
    },

    accountType: {
      type: String,
      required: true
    },

    bankName: {
      type: String
    },

    accountNumber: {
      type: String
    },

    transactionType: {
      type: String,
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    referenceNumber: {
      type: String
    },

    status: {
      type: String,
      default: 'Completed'
    },

    remarks: {
      type: String
    },

    source: {
      type: String,
      enum: ['accounts', 'admin'],
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('BankCash', bankCashSchema);