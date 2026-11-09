const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema(
  {
    auditId: {
      type: String,
      required: true,
      unique: true
    },

    // Owner of this audit record
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserRole',
      required: true,
      index: true
    },

    // Keep the username separately for display
    userName: {
      type: String,
      trim: true
    },

    module: {
      type: String,
      required: true,
      default: 'General'
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
      default: '127.0.0.1'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('AuditLog', auditLogSchema);