const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
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
    
  vendor: {
    type: String,
    required: true,
  },

  expenseType: {
    type: String,
    enum: [
      "Electricity",
      "Water",
      "Cleaning",
      "Staff Salary",
      "Staff salary",
      "Sadaqah Fund",
      "Maintenance",
      "Utility Bills",
      "hadia",
      "Ramzan Bonus",
      "Other",
    ],
    required: true,
  },

  fundCategory: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  expenseDate: {
    type: String,
  },

  receiptNumber: {
    type: String,
    unique: true,
  },

  status: {
    type: String,
    default: "Completed",
  },

  notes: {
    type: String,
  },

  // ==========================================
  // WHERE THIS EXPENSE WAS CREATED
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

module.exports = mongoose.model("Expense", ExpenseSchema);