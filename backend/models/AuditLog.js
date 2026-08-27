const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  auditId: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: String,
    required: true
  },
  module: {
    type: String,
    required: true,
    default: "General"
  },
  action: {
    type: String,
    required: true
  },
  timestamp: {
    type: String,
    required: true
  },
  ipAddress: {
    type: String,
    required: true,
    default: "127.0.0.1"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('AuditLog', auditLogSchema);