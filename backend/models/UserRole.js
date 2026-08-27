const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userRoleSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  plainPassword: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    required: true,
    default: "Viewer"
  },
  permissions: {
    type: Object,
    default: {}
  },
  twoFactor: {
    type: String,
    required: true,
    default: "Disabled"
  },
  status: {
    type: String,
    required: true,
    default: "Active"
  },
  lastLogin: {
    type: Date
  },
  refreshToken: {
    type: String,
    select: false
  }
}, {
  timestamps: true
});

// Compare password method
userRoleSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT token
userRoleSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { 
      id: this._id,
      userId: this.userId,
      role: this.role,
      permissions: this.permissions
    },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' }
  );
};

module.exports = mongoose.model('UserRole', userRoleSchema);