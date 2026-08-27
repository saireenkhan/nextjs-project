// routes/reports.js
const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

// GET all reports
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST create report
router.post('/', async (req, res) => {
  try {
    const newReport = new Report(req.body);
    const savedReport = await newReport.save();
    res.status(201).json({ success: true, data: savedReport });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// GET export PDF stub route
router.get('/:id/pdf', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ success: false, error: "Report not found" });
    }
    // Implement PDF generation logic (e.g., PDFKit) here
    res.send(`Generating PDF export for Report ID: ${report._id}`);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;