const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    // Owner of this record
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserRole',
      required: true,
      index: true
    },

    panel: {
      type: String,
      enum: [
        'admin',
        'accounts',
        'controller',
        'imam',
        'muqtadi',
        'moazzin'
      ],
      required: true
    },

    vendor: {
      type: String,
      required: true,
      trim: true
    },

    expenseType: {
      type: String,
      required: true
    },

    fundCategory: {
      type: String,
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    expenseDate: {
      type: Date,
      required: true
    },

    receiptNumber: {
      type: String,
      required: true,
      unique: true
    },

    status: {
      type: String,
      default: 'Completed'
    },

    notes: {
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

module.exports = mongoose.model('Expense', expenseSchema);