const mongoose = require("mongoose");

const EventKhateebSchema = new mongoose.Schema(
  {
    eventId: { type: String, required: true, unique: true },
    eventType: { type: String, required: true },
    eventDate: { type: String },
    eventTime: { type: String },
    needKhateeb: { type: String },
    needQariTaraweeh: { type: String },
    personType: { type: String },
    fullName: { type: String, required: true },
    phone: { type: String },
    cnic: { type: String },
    qualification: { type: String },
    speciality: { type: String },
    assignedTopic: { type: String },
    hadiaFund: { type: String },
    hadiaAmount: { type: Number, default: 0 },
    paymentStatus: { type: String, default: "Pending" },
    status: { type: String, default: "Verified" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("EventKhateeb", EventKhateebSchema);