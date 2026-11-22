const jwt = require('jsonwebtoken');
const UserRole = require('../models/UserRole');

const authenticate = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';

    if (!header.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Access denied. No token provided.'
      });
    }

    const token = header.slice(7).trim();

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Access denied. No token provided.'
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        error: 'JWT secret is not configured.'
      });
    }

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired token.'
      });
    }

    const user = await UserRole.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'User not found.'
      });
    }

    if (user.status !== 'Active') {
      return res.status(403).json({
        success: false,
        error: 'Account is not active.'
      });
    }

    req.user = user;
    req.token = token;

    return next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Authentication failed.'
    });
  }
};

const authorize = (...roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'User not authenticated.'
    });
  }

  if (!roles.includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      error: 'Role not authorized.'
    });
  }

  next();
};

const authorizePermission = (permission) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'User not authenticated.'
    });
  }

  if (!req.user.permissions?.[permission]) {
    return res.status(403).json({
      success: false,
      error: 'Permission denied.'
    });
  }

  next();
};

const authorizeAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'User not authenticated.'
    });
  }

  if (req.user.role !== 'Admin') {
    return res.status(403).json({
      success: false,
      error: 'Admin access required.'
    });
  }

  next();
};

module.exports = {
  authenticate,
  authorize,
  authorizePermission,
  authorizeAdmin
};
