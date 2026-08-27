const express = require('express');
const router = express.Router();
const Vote = require('../models/Vote');

// GET all votes (optional, for admin auditing if needed)
router.get('/', async (req, res) => {
  try {
    const votes = await Vote.find().sort({ createdAt: -1 });
    return res.json(votes);
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// POST cast a vote
router.post('/', async (req, res) => {
  try {
    const newVote = new Vote(req.body);
    const savedVote = await newVote.save();
    return res.status(201).json({ success: true, data: savedVote });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, error: "Duplicate Vote ID or voter already cast a ballot." });
    }
    return res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;