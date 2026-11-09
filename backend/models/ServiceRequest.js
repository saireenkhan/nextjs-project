const mongoose = require('mongoose');
const enforceDataIsolation = require('../middleware/dataIsolation');

const serviceRequestSchema = new mongoose.Schema({
  requestId: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserRole', required: true },
  requestType: { type: String, required: true },
  requesterName: { type: String, required: true },
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

// Attach central isolation rule
serviceRequestSchema.plugin(enforceDataIsolation);

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);