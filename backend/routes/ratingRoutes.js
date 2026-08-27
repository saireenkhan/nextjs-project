const express = require('express');
const router = express.Router();
// Match the exact filename of your model (e.g., Ratting or Rating)
const Rating = require('../models/Ratting'); 

// GET ratings (Supports panel filtering)
router.get('/', async (req, res) => {
  try {
    const { panel } = req.query;
    let filter = {};

    // If a specific panel filter is passed (and it's not admin), filter by it.
    // Admin panel can fetch without query params to see all records.
    if (panel && panel !== "admin") {
      filter.panel = panel;
    }

    const ratings = await Rating.find(filter).sort({ createdAt: -1 });
    return res.json({ success: true, data: ratings });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// POST create rating
router.post('/', async (req, res) => {
  try {
    const newRating = new Rating(req.body);
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