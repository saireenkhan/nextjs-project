const express = require('express');
const router = express.Router();

const AuditLog = require('../models/AuditLog');
const PDFDocument = require('pdfkit');

const { authenticate } = require('../middleware/auth');
const { getQueryFilter } = require('../utils/queryHelper');

// ======================================================
// GET ALL AUDIT LOGS
// Normal user → only their own logs
// Admin → all logs
// ======================================================

router.get('/', authenticate, async (req, res) => {
  try {
    const logs = await AuditLog.find(
      getQueryFilter(req)
    )
      .populate('user', 'userId fullName username panel role')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: logs
    });
  } catch (error) {
    console.error('Error fetching audit logs:', error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ======================================================
// GET SINGLE AUDIT LOG
// Normal user → only their own log
// Admin → any log
// ======================================================

router.get('/:id', authenticate, async (req, res) => {
  try {
    const log = await AuditLog.findOne(
      getQueryFilter(req, {
        _id: req.params.id
      })
    ).populate(
      'user',
      'userId fullName username panel role'
    );

    if (!log) {
      return res.status(404).json({
        success: false,
        error: 'Audit log not found'
      });
    }

    res.status(200).json({
      success: true,
      data: log
    });
  } catch (error) {
    console.error('Error fetching audit log:', error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ======================================================
// CREATE AUDIT LOG
// Ownership comes from logged-in user
// ======================================================

router.post('/', authenticate, async (req, res) => {
  try {
    const newLog = new AuditLog({
      ...req.body,

      // Never trust user ownership from frontend
      user: req.user._id,

      // Store username separately for display
      userName:
        req.user.username ||
        req.user.fullName ||
        req.user.userId ||
        ''
    });

    const savedLog = await newLog.save();

    res.status(201).json({
      success: true,
      data: savedLog
    });
  } catch (error) {
    console.error('Error creating audit log:', error);

    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// ======================================================
// GET AUDIT LOG PDF
// Normal user → own PDF only
// Admin → any PDF
// ======================================================

router.get('/:id/pdf', authenticate, async (req, res) => {
  try {
    const log = await AuditLog.findOne(
      getQueryFilter(req, {
        _id: req.params.id
      })
    ).populate(
      'user',
      'userId fullName username panel role'
    );

    if (!log) {
      return res.status(404).send('Audit log not found');
    }

    res.setHeader('Content-Type', 'application/pdf');

    res.setHeader(
      'Content-Disposition',
      `inline; filename=audit-${log.auditId}.pdf`
    );

    const doc = new PDFDocument({ margin: 50 });

    doc.pipe(res);

    doc
      .fontSize(22)
      .fillColor('#166534')
      .text('Hisab-Ul-Khair', {
        align: 'center'
      });

    doc
      .fontSize(12)
      .fillColor('#555555')
      .text('Audit Log Report', {
        align: 'center'
      });

    doc.moveDown(2);

    doc
      .fontSize(15)
      .fillColor('#000000')
      .text('Audit Information', {
        underline: true
      });

    doc.moveDown();

    doc.fontSize(11);

    doc.text(`Audit ID: ${log.auditId}`);

    doc.text(
      `User: ${
        log.userName ||
        log.user?.username ||
        log.user?.fullName ||
        'N/A'
      }`
    );

    doc.text(`Module: ${log.module}`);

    doc.text(`Action: ${log.action}`);

    doc.text(`Timestamp: ${log.timestamp}`);

    doc.text(`IP Address: ${log.ipAddress}`);

    doc.moveDown(3);

    doc
      .fontSize(9)
      .fillColor('#888888')
      .text(
        'This is a system-generated electronic document.',
        {
          align: 'center'
        }
      );

    doc.end();
  } catch (error) {
    console.error('Error generating audit PDF:', error);

    res.status(500).send(
      'Server Error generating audit PDF'
    );
  }
});

module.exports = router;