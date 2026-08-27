const mongoose = require("mongoose");

const BankCashSchema = new mongoose.Schema(
  {
    transactionId: { type: String, required: true, unique: true },
    accountType: { type: String, required: true },
    bankName: { type: String },
    accountNumber: { type: String },
    transactionType: { type: String, required: true },
    amount: { type: Number, required: true, default: 0 },
    date: { type: String },
    referenceNumber: { type: String },
    status: { type: String, required: true, default: "Reconciled" },
    remarks: { type: String },
    source: {
      type: String,
      enum: ["accounts", "admin"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BankCash", BankCashSchema);