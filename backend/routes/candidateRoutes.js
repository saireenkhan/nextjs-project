const express = require('express');
const router = express.Router();

const Candidate = require('../models/Candidate');
const PDFDocument = require('pdfkit');

const { authenticate } = require('../middleware/auth');
const { getQueryFilter } = require('../utils/queryHelper');

// ======================================================
// GET CANDIDATE PDF
// Normal user → own candidate only
// Admin → any candidate
// ======================================================

router.get('/:id/pdf', authenticate, async (req, res) => {
  try {
    const candidate = await Candidate.findOne(
      getQueryFilter(req, {
        _id: req.params.id
      })
    );

    if (!candidate) {
      return res.status(404).send('Candidate not found');
    }

    res.setHeader('Content-Type', 'application/pdf');

    res.setHeader(
      'Content-Disposition',
      `inline; filename=candidate-${candidate.candidateId}.pdf`
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
      .text('Candidate Report', {
        align: 'center'
      });

    doc.moveDown(2);

    doc
      .fontSize(15)
      .fillColor('#000000')
      .text('Candidate Information', {
        underline: true
      });

    doc.moveDown();

    doc.fontSize(11);

    doc.text(`Candidate ID: ${candidate.candidateId}`);
    doc.text(`Candidate Name: ${candidate.candidateName}`);
    doc.text(`Position: ${candidate.position}`);
    doc.text(`Election: ${candidate.election}`);
    doc.text(`Total Votes: ${candidate.totalVotes}`);
    doc.text(`Vote Percentage: ${candidate.votePercentage}%`);
    doc.text(`Status: ${candidate.status}`);
    doc.text(`Source: ${candidate.source}`);

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
    console.error('Error generating candidate PDF:', error);

    res.status(500).send(
      'Server Error generating candidate PDF'
    );
  }
});

// ======================================================
// GET COMMITTEE CANDIDATES
// Committee user → only their own candidates
// Admin → committee candidates from all users
// ======================================================

router.get('/committee', authenticate, async (req, res) => {
  try {
    if (
      req.user.role !== 'Admin' &&
      req.user.panel !== 'Committee'
    ) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      });
    }

    const filter = getQueryFilter(req, {
      source: 'committee'
    });

    const candidates = await Candidate.find(filter).sort({
      createdAt: -1
    });

    res.status(200).json({
      success: true,
      data: candidates
    });
  } catch (error) {
    console.error(
      'Error fetching committee candidates:',
      error
    );

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ======================================================
// GET ADMIN CANDIDATES
// Admin → all candidates
// ======================================================

router.get('/admin', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'Admin') {
      return res.status(403).json({
        success: false,
        error: 'Admin access required'
      });
    }

    const candidates = await Candidate.find().sort({
      createdAt: -1
    });

    res.status(200).json({
      success: true,
      data: candidates
    });
  } catch (error) {
    console.error(
      'Error fetching admin candidates:',
      error
    );

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ======================================================
// CREATE COMMITTEE CANDIDATE
// Ownership comes from logged-in user
// ======================================================

router.post('/committee', authenticate, async (req, res) => {
  try {
    if (
      req.user.role !== 'Admin' &&
      req.user.panel !== 'Committee'
    ) {
      return res.status(403).json({
        success: false,
        error: 'Access denied'
      });
    }

    const candidate = new Candidate({
      ...req.body,

      // Never trust ownership from frontend
      user: req.user._id,

      // Backend controls the source
      source: 'committee'
    });

    const savedCandidate = await candidate.save();

    res.status(201).json({
      success: true,
      data: savedCandidate
    });
  } catch (error) {
    console.error(
      'Error creating committee candidate:',
      error
    );

    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// ======================================================
// CREATE ADMIN CANDIDATE
// Admin only
// ======================================================

router.post('/admin', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'Admin') {
      return res.status(403).json({
        success: false,
        error: 'Admin access required'
      });
    }

    const candidate = new Candidate({
      ...req.body,

      user: req.user._id,

      source: 'admin'
    });

    const savedCandidate = await candidate.save();

    res.status(201).json({
      success: true,
      data: savedCandidate
    });
  } catch (error) {
    console.error(
      'Error creating admin candidate:',
      error
    );

    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;