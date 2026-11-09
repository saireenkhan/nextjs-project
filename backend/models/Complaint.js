const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    // ======================================================
    // COMPLAINT ID
    // ======================================================

    complaintId: {
      type: String,
      required: true,
      unique: true,
    },


    // ======================================================
    // OWNER / DATA ISOLATION
    // ======================================================
    // Every complaint belongs to the UserRole account
    // that created it.

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserRole",
      required: true,
      index: true,
    },


    // ======================================================
    // PERSON INFORMATION
    // ======================================================

    personType: {
      type: String,
    },

    personName: {
      type: String,
      required: true,
    },


    // ======================================================
    // COMPLAINT INFORMATION
    // ======================================================

    category: {
      type: String,
      required: true,
      default: "General",
    },

    priority: {
      type: String,
      required: true,
      default: "Medium",
    },

    status: {
      type: String,
      required: true,
      default: "Pending",
    },

    assignedTo: {
      type: String,
      required: true,
      default: "Admin",
    },

    complaintDate: {
      type: String,
    },

    description: {
      type: String,
    },


    // ======================================================
    // SOURCE
    // ======================================================
    // Tells us which panel created the complaint.

    source: {
      type: String,
      enum: [
        "admin",
        "committee",
        "moazzin",
        "muqtadi",
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


// ==========================================================
// AUTO-GENERATE complaintId IF MISSING
// ==========================================================

complaintSchema.pre("validate", function () {
  if (!this.complaintId) {
    this.complaintId = `CMP-${Date.now()}-${Math.floor(
      100 + Math.random() * 900
    )}`;
  }
});


module.exports = mongoose.model(
  "Complaint",
  complaintSchema
);