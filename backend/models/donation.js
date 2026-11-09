const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema(
  {
    // Owner of this donation record
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

    donorName: {
      type: String,
      required: true,
      trim: true
    },

    donorPhone: {
      type: String,
      trim: true
    },

    donorCNIC: {
      type: String,
      trim: true
    },

    donationType: {
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

    donationDate: {
      type: Date,
      required: true
    },

    receiptNumber: {
      type: String,
      unique: true,
      sparse: true
    },

    status: {
      type: String,
      default: 'Completed'
    },

    notes: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Donation', donationSchema);