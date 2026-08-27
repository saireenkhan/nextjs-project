const express = require('express');
const router = express.Router();
const UserRole = require('../models/UserRole');
const bcrypt = require('bcryptjs');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await UserRole.find()
      .select('-password')
      .sort({ createdAt: -1 });
    
    return res.json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// GET single user
router.get('/:id', async (req, res) => {
  try {
    const user = await UserRole.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found.' 
      });
    }
    
    return res.json({
      success: true,
      data: user
    });
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// POST create user
router.post('/', async (req, res) => {
  try {
    const { userId, fullName, username, password, role, twoFactor, status } = req.body;

    // Validate required fields
    if (!userId || !fullName || !username || !password || !role) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields: userId, fullName, username, password, role'
      });
    }

    // Check if user exists
    const existingUser = await UserRole.findOne({ 
      $or: [{ userId }, { username }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        error: 'Duplicate User ID or Username already exists.' 
      });
    }

    // Create new user with PLAIN TEXT password (NOT hashed)
    const newUserRole = new UserRole({
      userId,
      fullName,
      username,
      password: password, // Store as plain text
      role: role || 'Viewer',
      twoFactor: twoFactor || 'Disabled',
      status: status || 'Active'
    });

    const savedUser = await newUserRole.save();

    return res.status(201).json({ 
      success: true, 
      message: 'User created successfully',
      data: savedUser 
    });
  } catch (error) {
    console.error('Error creating user:', error);
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        error: "Duplicate User ID or Username already exists." 
      });
    }
    return res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
});
// PUT update user
router.put('/:id', async (req, res) => {
  try {
    const updates = { ...req.body };
    
    // Don't allow password update through this route
    delete updates.password;
    
    // If password is provided, hash it
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(req.body.password, salt);
    }

    const user = await UserRole.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found.' 
      });
    }

    return res.json({ 
      success: true, 
      message: 'User updated successfully',
      data: user 
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// DELETE user
router.delete('/:id', async (req, res) => {
  try {
    const user = await UserRole.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'User not found.' 
      });
    }

    return res.json({ 
      success: true, 
      message: 'User deleted successfully.' 
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// GET PDF report
router.get('/:id/pdf', async (req, res) => {
  try {
    const user = await UserRole.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: "User record not found" 
      });
    }
    
    return res.json({
      success: true,
      message: `PDF report for User ID: ${user.userId}`,
      data: {
        userId: user.userId,
        fullName: user.fullName,
        role: user.role,
        status: user.status
      }
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = router;