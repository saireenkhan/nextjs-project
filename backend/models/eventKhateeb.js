const mongoose = require('mongoose');

const eventKhateebSchema = new mongoose.Schema(
  {
    // Owner of this record
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserRole',
      required: true,
      index: true
    },

    eventId: {
      type: String,
      required: true,
      unique: true
    },

    eventType: {
      type: String,
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    time: {
      type: String,
      required: true
    },

    needKhateeb: {
      type: Boolean,
      default: false
    },

    needQariTaraweeh: {
      type: Boolean,
      default: false
    },

    personType: {
      type: String
    },

    fullName: {
      type: String
    },

    phone: {
      type: String
    },

    cnic: {
      type: String
    },

    qualification: {
      type: String
    },

    speciality: {
      type: String
    },

    assignedTopic: {
      type: String
    },

    hadiaFund: {
      type: String
    },

    hadiaAmount: {
      type: Number,
      default: 0
    },

    paymentStatus: {
      type: String,
      default: 'Pending'
    },

    status: {
      type: String,
      default: 'Pending'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('EventKhateeb', eventKhateebSchema);