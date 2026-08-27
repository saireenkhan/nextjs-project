const mongoose = require("mongoose");

const FundSchema = new mongoose.Schema({

  fundCode: {
    type: String,
    required: true,
    unique: true,
  },

  fundName: {
    type: String,
    required: true,
  },

  openingBalance: {
    type: Number,
    required: true,
    default: 0,
  },

  currentBalance: {
    type: Number,
    required: true,
    default: 0,
  },

  // NOTE: left as a free-text String (no enum) on purpose —
  // Accounts panel uses "General Ledger" as a default, Admin
  // panel uses "Asset" / "Liability" / "Income" / "Expense".
  // Restricting this would break one panel or the other.
  ledgerType: {
    type: String,
    required: true,
  },

  // NOTE: also free-text — Accounts uses "Active"/"Inactive",
  // Admin uses "Verified"/"Pending". Same reasoning as Expense's
  // status field, which has no enum either.
  status: {
    type: String,
    default: "Active",
  },

  description: {
    type: String,
  },

  // ==========================================
  // WHERE THIS FUND RECORD WAS CREATED
  // ==========================================
  source: {
    type: String,
    enum: ["accounts", "admin"],
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Fund", FundSchema);