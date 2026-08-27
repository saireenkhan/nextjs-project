const jwt = require('jsonwebtoken');
const UserRole = require('../models/UserRole');

// Authenticate user
const authenticate = async (req, res, next) => {
  try {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        error: 'Access denied. No token provided.' 
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      const user = await UserRole.findById(decoded.id);
      
      if (!user) {
        return res.status(401).json({ 
          success: false, 
          error: 'Invalid token. User not found.' 
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
      next();
    } catch (error) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid token.' 
      });
    }
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      error: 'Authentication failed.' 
    });
  }
};

// Role-based authorization
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        error: 'User not authenticated.' 
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        error: `Role ${req.user.role} is not authorized.` 
      });
    }
    next();
  };
};

// Permission-based authorization
const authorizePermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        error: 'User not authenticated.' 
      });
    }

    if (!req.user.permissions || !req.user.permissions[permission]) {
      return res.status(403).json({ 
        success: false, 
        error: `You don't have ${permission} permission.` 
      });
    }
    next();
  };
};

// Multiple permissions authorization
const authorizePermissions = (...permissions) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        error: 'User not authenticated.' 
      });
    }

    const hasAllPermissions = permissions.every(permission => 
      req.user.permissions && req.user.permissions[permission]
    );

    if (!hasAllPermissions) {
      return res.status(403).json({ 
        success: false, 
        error: `You don't have required permissions.` 
      });
    }
    next();
  };
};

// Admin only authorization
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
  authorizePermissions,
  authorizeAdmin
};