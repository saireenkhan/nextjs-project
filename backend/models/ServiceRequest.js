const mongoose = require("mongoose");

const ServiceRequestSchema = new mongoose.Schema({
  requestId: { type: String, required: true, unique: true },
  requestType: { type: String, required: true }, // e.g., Nikah, Janazah, Dua, etc.
  requesterName: { type: String, required: true },
  phone: { type: String, required: true },
  requiredDate: { type: String, required: true },
  priority: { type: String, enum: ["Low", "Medium", "High", "Urgent"], default: "Medium" },
  status: { type: String, enum: ["Submitted", "Under Review", "Approved", "Rejected"], default: "Submitted" },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("ServiceRequest", ServiceRequestSchema);