const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');

// GET export PDF stub route (kept as-is — already existed and
// already worked for Admin's "View" button; Committee's "View"
// button called "/profile", which never existed, so it's now
// pointed at this instead)
router.get('/:id/pdf', async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ success: false, error: "Candidate not found" });
    }
    return res.send(`Generating PDF export for Candidate ID: ${candidate.candidateId} (${candidate.candidateName})`);
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});


// ======================================================
// GET COMMITTEE CANDIDATES
// Committee can ONLY see candidates added by Committee
// ======================================================

router.get('/committee', async (req, res) => {
  try {
    const candidates = await Candidate.find({
      source: "committee",
    }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: candidates,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// ======================================================
// GET ADMIN CANDIDATES
// Admin can see BOTH Committee + Admin candidates
// ======================================================

router.get('/admin', async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({
      createdAt: -1,
    });

    return res.json({
      success: true,
      data: candidates,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// ======================================================
// CREATE CANDIDATE FROM COMMITTEE PANEL
// ======================================================

router.post('/committee', async (req, res) => {
  try {
    const newCandidate = new Candidate({
      ...req.body,

      // VERY IMPORTANT
      // We decide the source from the endpoint,
      // not from the frontend.
      source: "committee",
    });

    const savedCandidate = await newCandidate.save();

    return res.status(201).json({
      success: true,
      data: savedCandidate,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Duplicate Candidate ID already exists.",
      });
    }
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});


// ======================================================
// CREATE CANDIDATE FROM ADMIN PANEL
// ======================================================

router.post('/admin', async (req, res) => {
  try {
    const newCandidate = new Candidate({
      ...req.body,

      // VERY IMPORTANT
      source: "admin",
    });

    const savedCandidate = await newCandidate.save();

    return res.status(201).json({
      success: true,
      data: savedCandidate,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Duplicate Candidate ID already exists.",
      });
    }
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;