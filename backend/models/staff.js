const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema(
  {
    // Owner of this record
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserRole',
      required: true,
      index: true
    },

    staffId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    fullName: {
      type: String,
      required: true,
      trim: true
    },

    fatherName: {
      type: String,
      trim: true
    },

    cnic: {
      type: String,
      trim: true
    },

    phone: {
      type: String,
      trim: true
    },

    email: {
      type: String,
      trim: true
    },

    address: {
      type: String
    },

    designation: {
      type: String,
      required: true
    },

    education: {
      type: String
    },

    experience: {
      type: String
    },

    joiningDate: {
      type: Date
    },

    currentMonthlySalary: {
      type: Number,
      default: 0
    },

    previousSalary: {
      type: Number,
      default: 0
    },

    salaryIncreaseAmount: {
      type: Number,
      default: 0
    },

    salaryIncreaseDate: {
      type: Date
    },

    salaryIncreaseReason: {
      type: String
    },

    ramadanBonus: {
      type: Number,
      default: 0
    },

    month: {
      type: String
    },

    status: {
      type: String,
      default: 'Active'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Staff', staffSchema);