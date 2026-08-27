const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// GET: Fetch all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST: Create a new event and save submitted form data
router.post('/', async (req, res) => {
  try {
    const newEvent = new Event({
      event: req.body.event,
      date: req.body.date,
      time: req.body.time,
      speaker: req.body.speaker,
      topic: req.body.topic,
      status: req.body.status
    });
    const savedEvent = await newEvent.save();
    res.status(201).json({ success: true, data: savedEvent });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;