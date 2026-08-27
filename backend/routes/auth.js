const express = require('express');
const router = express.Router();
const UserRole = require('../models/UserRole');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// LOGIN route
// LOGIN route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide username and password' 
      });
    }

    // Find user
    const user = await UserRole.findOne({ username }).select('+password');

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid credentials.' 
      });
    }

    // Check if account is active
    if (user.status !== 'Active') {
      return res.status(403).json({ 
        success: false, 
        error: 'Account is not active. Please contact administrator.' 
      });
    }

    // For plain text password comparison
    let isPasswordValid = false;
    
    // Check if password is hashed (starts with $2)
    if (user.password.startsWith('$2')) {
      // Hashed password - use bcrypt
      isPasswordValid = await bcrypt.compare(password, user.password);
    } else {
      // Plain text password - direct comparison
      isPasswordValid = (password === user.password);
    }

    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid credentials.' 
      });
    }

    // Generate token
    const token = jwt.sign(
      { 
        id: user._id,
        userId: user.userId,
        role: user.role
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Remove password from response
    const userResponse = {
      _id: user._id,
      userId: user.userId,
      fullName: user.fullName,
      username: user.username,
      role: user.role,
      permissions: user.permissions,
      twoFactor: user.twoFactor,
      status: user.status
    };

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userResponse,
        token: token,
        refreshToken: token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Login failed' 
    });
  }
});

module.exports = router;