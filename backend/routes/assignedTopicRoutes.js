const express = require('express');
const router = express.Router();
const AssignedTopic = require('../models/AssignedTopic');

// GET all assigned topics
router.get('/', async (req, res) => {
  try {
    const topics = await AssignedTopic.find().sort({ createdAt: -1 });
    return res.json(topics);
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// POST create assigned topic record
router.post('/', async (req, res) => {
  try {
    const newTopic = new AssignedTopic(req.body);
    const savedTopic = await newTopic.save();
    return res.status(201).json({ success: true, data: savedTopic });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;