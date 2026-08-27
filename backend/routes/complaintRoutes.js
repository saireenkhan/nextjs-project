const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

// GET report/PDF (kept as-is — already worked for Admin; Committee's
// "/detail" and Moazzin's "/details" and Muqtadi's "/export" never
// matched a real route, so all four now point here)
router.get('/:id/pdf', async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ success: false, error: "Complaint record not found" });
    }
    return res.send(`Generating PDF report for Complaint ID: ${complaint.complaintId}`);
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});


// ======================================================
// GET ADMIN COMPLAINTS
// Admin can see ALL complaints — Committee, Moazzin, Muqtadi
// ======================================================

router.get('/admin', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    return res.json({ success: true, data: complaints });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});


// ======================================================
// GET COMMITTEE COMPLAINTS
// Committee can ONLY see complaints filed by Committee
// ======================================================

router.get('/committee', async (req, res) => {
  try {
    const complaints = await Complaint.find({ source: "committee" }).sort({ createdAt: -1 });
    return res.json({ success: true, data: complaints });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});


// ======================================================
// GET MOAZZIN COMPLAINTS
// Moazzin can ONLY see complaints filed by Moazzin
// ======================================================

router.get('/moazzin', async (req, res) => {
  try {
    const complaints = await Complaint.find({ source: "moazzin" }).sort({ createdAt: -1 });
    return res.json({ success: true, data: complaints });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});


// ======================================================
// GET MUQTADI COMPLAINTS
// Muqtadi can ONLY see complaints filed by Muqtadi
// ======================================================

router.get('/muqtadi', async (req, res) => {
  try {
    const complaints = await Complaint.find({ source: "muqtadi" }).sort({ createdAt: -1 });
    return res.json({ success: true, data: complaints });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});


// ======================================================
// CREATE COMPLAINT FROM ADMIN PANEL
// ======================================================

router.post('/admin', async (req, res) => {
  try {
    const newComplaint = new Complaint({
      ...req.body,

      // VERY IMPORTANT
      // We decide the source from the endpoint,
      // not from the frontend.
      source: "admin",
    });
    const savedComplaint = await newComplaint.save();
    return res.status(201).json({ success: true, data: savedComplaint });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, error: "Duplicate Complaint ID already exists." });
    }
    return res.status(400).json({ success: false, error: error.message });
  }
});


// ======================================================
// CREATE COMPLAINT FROM COMMITTEE PANEL
// ======================================================

router.post('/committee', async (req, res) => {
  try {
    const newComplaint = new Complaint({
      ...req.body,
      source: "committee",
    });
    const savedComplaint = await newComplaint.save();
    return res.status(201).json({ success: true, data: savedComplaint });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, error: "Duplicate Complaint ID already exists." });
    }
    return res.status(400).json({ success: false, error: error.message });
  }
});


// ======================================================
// CREATE COMPLAINT FROM MOAZZIN PANEL
// ======================================================

router.post('/moazzin', async (req, res) => {
  try {
    const newComplaint = new Complaint({
      ...req.body,
      source: "moazzin",
    });
    const savedComplaint = await newComplaint.save();
    return res.status(201).json({ success: true, data: savedComplaint });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, error: "Duplicate Complaint ID already exists." });
    }
    return res.status(400).json({ success: false, error: error.message });
  }
});


// ======================================================
// CREATE COMPLAINT FROM MUQTADI PANEL
// ======================================================

router.post('/muqtadi', async (req, res) => {
  try {
    const newComplaint = new Complaint({
      ...req.body,
      source: "muqtadi",
    });
    const savedComplaint = await newComplaint.save();
    return res.status(201).json({ success: true, data: savedComplaint });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, error: "Duplicate Complaint ID already exists." });
    }
    return res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;