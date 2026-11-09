const mongoose = require('mongoose');

const assignedTopicSchema = new mongoose.Schema({
  // Owner of this record
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserRole',
    required: true,
    index: true
  },

  imamId: {
    type: String,
    required: true
  },

  imamName: {
    type: String,
    required: true
  },

  assignedEvent: {
    type: String,
    required: true
  },

  assignedTopic: {
    type: String,
    required: true
  },

  preparationStatus: {
    type: String,
    required: true,
    default: "In Progress"
  },

  complaintStatus: {
    type: String,
    required: true,
    default: "Pending"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('AssignedTopic', assignedTopicSchema);