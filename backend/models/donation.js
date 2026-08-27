const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema(
  {
    // Which panel created this donation
    panel: {
      type: String,
      required: true,
      enum: [
        "admin",
        "accounts",
        "controller",
        "imam",
        "muqtadi",
        "moazzin",
      ],
      default: "accounts",
    },

    donorName: {
      type: String,
      required: true,
    },

    donorPhone: {
      type: String,
      default: "",
    },

    donorCNIC: {
      type: String,
      default: "",
    },

    donationType: {
      type: String,
      enum: [
        "Cash",
        "Online",
        "Online Transfer",
        "Cheque",
        "Bank Transfer",
      ],
      required: true,
    },

    fundCategory: {
      type: String,
      enum: [
        "General Donation",
        "Zakat",
        "Zakat Fund",
         "Sadaqah Fund",
       "Madrasa Fund", 
        "Masjid Fund",
        "Building Fund",
        "Education Fund",
      ],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    donationDate: {
      type: String,
      default: "",
    },

    receiptNumber: {
      type: String,
      unique: true,
      sparse: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Verified", "Completed"],
      default: "Pending",
    },

    notes: {
      type: String,
      default: "",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Donation", DonationSchema);