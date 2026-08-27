const express = require('express');
const router = express.Router();
const AuditLog = require('../models/AuditLog');

// GET all audit logs
router.get('/', async (req, res) => {
  try {
    const audits = await AuditLog.find().sort({ createdAt: -1 });
    return res.json(audits);
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// POST create audit log
router.post('/', async (req, res) => {
  try {
    const newAudit = new AuditLog(req.body);
    const savedAudit = await newAudit.save();
    return res.status(201).json({ success: true, data: savedAudit });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, error: "Duplicate Audit ID already exists." });
    }
    return res.status(400).json({ success: false, error: error.message });
  }
});

// GET report/PDF stub
router.get('/:id/pdf', async (req, res) => {
  try {
    const audit = await AuditLog.findById(req.params.id);
    if (!audit) {
      return res.status(404).json({ success: false, error: "Audit record not found" });
    }
    return res.send(`Generating audit report for Audit ID: ${audit.auditId}`);
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;