const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

// Simple test handler to verify the route works without crashing
router.use(authenticate);

router.get('/', (req, res) => {
  res.status(200).json({ success: true, message: "Service requests endpoint working" });
});

router.post('/', (req, res) => {
  res.status(201).json({ success: true, message: "Service request created" });
});

module.exports = router;