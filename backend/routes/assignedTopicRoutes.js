const express = require('express');
const router = express.Router();

const AssignedTopic = require('../models/AssignedTopic');
const { authenticate } = require('../middleware/auth');
const { getQueryFilter } = require('../utils/queryHelper');

// ======================================================
// GET ALL ASSIGNED TOPICS
// Normal user → only their own topics
// Admin → all topics
// ======================================================

router.get('/', authenticate, async (req, res) => {
  try {
    const topics = await AssignedTopic.find(
      getQueryFilter(req)
    ).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: topics
    });
  } catch (error) {
    console.error('Error fetching assigned topics:', error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ======================================================
// GET SINGLE ASSIGNED TOPIC
// Normal user → only their own topic
// Admin → any topic
// ======================================================

router.get('/:id', authenticate, async (req, res) => {
  try {
    const topic = await AssignedTopic.findOne(
      getQueryFilter(req, {
        _id: req.params.id
      })
    );

    if (!topic) {
      return res.status(404).json({
        success: false,
        error: 'Assigned topic not found'
      });
    }

    res.status(200).json({
      success: true,
      data: topic
    });
  } catch (error) {
    console.error('Error fetching assigned topic:', error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ======================================================
// CREATE ASSIGNED TOPIC
// Ownership comes from logged-in user
// ======================================================

router.post('/', authenticate, async (req, res) => {
  try {
    const newTopic = new AssignedTopic({
      ...req.body,

      // Never trust user ID from frontend
      user: req.user._id
    });

    const savedTopic = await newTopic.save();

    res.status(201).json({
      success: true,
      data: savedTopic
    });
  } catch (error) {
    console.error('Error creating assigned topic:', error);

    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// ======================================================
// UPDATE ASSIGNED TOPIC
// User can update only their own topic
// Admin can update any topic
// ======================================================

router.put('/:id', authenticate, async (req, res) => {
  try {
    const updatedTopic = await AssignedTopic.findOneAndUpdate(
      getQueryFilter(req, {
        _id: req.params.id
      }),
      {
        $set: {
          ...req.body,

          // Ownership cannot be changed
          user: req.user._id
        }
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedTopic) {
      return res.status(404).json({
        success: false,
        error: 'Assigned topic not found'
      });
    }

    res.status(200).json({
      success: true,
      data: updatedTopic
    });
  } catch (error) {
    console.error('Error updating assigned topic:', error);

    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// ======================================================
// DELETE ASSIGNED TOPIC
// User can delete only their own topic
// Admin can delete any topic
// ======================================================

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const deletedTopic = await AssignedTopic.findOneAndDelete(
      getQueryFilter(req, {
        _id: req.params.id
      })
    );

    if (!deletedTopic) {
      return res.status(404).json({
        success: false,
        error: 'Assigned topic not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Assigned topic deleted successfully',
      data: deletedTopic
    });
  } catch (error) {
    console.error('Error deleting assigned topic:', error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;