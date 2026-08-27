const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  complaintId: {
    type: String,
    required: true,
    unique: true
  },

  // NOTE: added — Committee and Muqtadi both send this, but it
  // wasn't on the schema, so Mongoose silently dropped it.
  personType: {
    type: String,
  },

  personName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    default: "General"
  },
  priority: {
    type: String,
    required: true,
    default: "Medium"
  },
  status: {
    type: String,
    required: true,
    default: "Pending"
  },
  assignedTo: {
    type: String,
    required: true,
    default: "Admin"
  },

  // NOTE: unified field name. Moazzin's frontend sent
  // "submittedDate" and Muqtadi's sent "complaintDate" — neither
  // matched anything on the old schema, so both were silently
  // dropped. Both frontends now send "complaintDate".
  complaintDate: {
    type: String,
  },

  // NOTE: added — Committee and Muqtadi both send this, but it
  // wasn't on the schema either.
  description: {
    type: String,
  },

  // ==========================================
  // WHERE THIS COMPLAINT WAS FILED
  // ==========================================
  source: {
    type: String,
    enum: ["admin", "committee", "moazzin", "muqtadi"],
    required: true,
  },
}, {
  timestamps: true
});

// ==========================================================
// AUTO-GENERATE complaintId IF MISSING
// ==========================================================
// Muqtadi's frontend has never generated a complaintId client-side
// (unlike the other three panels), so every submission from that
// panel has been failing this schema's "required" validation and
// erroring out. This fills it in server-side as a safety net —
// it also protects every other panel if a frontend form is ever
// changed and forgets to send one.
complaintSchema.pre("validate", function () {
  if (!this.complaintId) {
    this.complaintId = `CMP-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
  }
});

module.exports = mongoose.model('Complaint', complaintSchema);