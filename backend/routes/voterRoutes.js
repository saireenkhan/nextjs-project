const express = require('express');
const router = express.Router();

const Voter = require('../models/Voter');
const { authenticate, authorizeAdmin } = require('../middleware/auth');
const { getQueryFilter } = require('../utils/queryHelper');

router.use(authenticate);

// ======================================================
// ADMIN - GET ALL VOTERS
// ======================================================

router.get('/admin', authorizeAdmin, async (req, res) => {
  try {
    const voters = await Voter.find({})
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: voters,
    });
  } catch (error) {
    console.error('Error fetching admin voters:', error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ======================================================
// ADMIN - CREATE VOTER
// ======================================================

router.post('/admin', authorizeAdmin, async (req, res) => {
  try {
    const voter = new Voter({
      ...req.body,
      user: req.user._id,
    });

    const savedVoter = await voter.save();

    return res.status(201).json({
      success: true,
      data: savedVoter,
    });
  } catch (error) {
    console.error('Error creating voter:', error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
// ======================================================
// GET VOTERS BY COMMITTEE
// ======================================================

router.get('/committee', async (req, res) => {
  try {
    // Find voters where committee field exists or filter by committee
    // You might need to adjust this based on your Voter model
    const voters = await Voter.find({ 
      // If you have a committee field in your Voter model
      // committee: { $exists: true }
      // Or if you have a specific committee ID
      // committeeId: req.user.committeeId // If user is assigned to a committee
    })
    .sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: voters,
    });
  } catch (error) {
    console.error('Error fetching committee voters:', error);
    
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});
// ======================================================
// GET ALL VOTERS - USER OWN DATA
// ======================================================

router.get('/', async (req, res) => {
  try {
    const filter = getQueryFilter(req);

    const voters = await Voter.find(filter)
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: voters,
    });
  } catch (error) {
    console.error('Error fetching voters:', error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ======================================================
// GET SINGLE VOTER
// ======================================================

router.get('/:id', async (req, res) => {
  try {
    const filter = getQueryFilter(req, {
      _id: req.params.id,
    });

    const voter = await Voter.findOne(filter);

    if (!voter) {
      return res.status(404).json({
        success: false,
        error: 'Voter not found',
      });
    }

    return res.json({
      success: true,
      data: voter,
    });
  } catch (error) {
    console.error('Error fetching voter:', error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ======================================================
// CREATE VOTER - USER OWN DATA
// ======================================================

router.post('/', async (req, res) => {
  try {
    const voter = new Voter({
      ...req.body,
      user: req.user._id,
    });

    const savedVoter = await voter.save();

    return res.status(201).json({
      success: true,
      data: savedVoter,
    });
  } catch (error) {
    console.error('Error creating voter:', error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ======================================================
// UPDATE VOTER
// ======================================================

router.put('/:id', async (req, res) => {
  try {
    const filter = getQueryFilter(req, {
      _id: req.params.id,
    });

    const updatedVoter = await Voter.findOneAndUpdate(
      filter,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedVoter) {
      return res.status(404).json({
        success: false,
        error: 'Voter not found',
      });
    }

    return res.json({
      success: true,
      data: updatedVoter,
    });
  } catch (error) {
    console.error('Error updating voter:', error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ======================================================
// DELETE VOTER
// ======================================================

router.delete('/:id', async (req, res) => {
  try {
    const filter = getQueryFilter(req, {
      _id: req.params.id,
    });

    const deletedVoter = await Voter.findOneAndDelete(filter);

    if (!deletedVoter) {
      return res.status(404).json({
        success: false,
        error: 'Voter not found',
      });
    }

    return res.json({
      success: true,
      message: 'Voter deleted successfully',
      data: deletedVoter,
    });
  } catch (error) {
    console.error('Error deleting voter:', error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;