const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  event: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  speaker: { type: String, required: true },
  topic: { type: String, required: true },
  status: { type: String, default: 'Confirmed' },

  // ==========================================
  // BRIDGE TRACEABILITY (optional)
  // ==========================================
  // Set only when this Event was auto-created from an Admin
  // "Events, Khateeb & Qari" submission (see eventKhateebRoutes.js).
  // Left undefined for events Muqtadi creates directly — does
  // NOT affect Muqtadi's existing create flow in any way.
  sourceEventKhateebId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EventKhateeb",
    required: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);