const express = require('express');
const router = express.Router();
const RatingImam = require('../models/RatingImam');

// GET all ratings
router.get('/', async (req, res) => {
  try {
    const ratings = await RatingImam.find().sort({ createdAt: -1 });
    return res.json(ratings);
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// POST create rating
router.post('/', async (req, res) => {
  try {
    const newRating = new RatingImam(req.body);
    const savedRating = await newRating.save();
    return res.status(201).json({ success: true, data: savedRating });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, error: "Duplicate Rating ID already exists." });
    }
    return res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;