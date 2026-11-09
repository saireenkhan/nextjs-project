const express = require("express");
const router = express.Router();
const Election = require("../models/Election");
const PDFDocument = require("pdfkit");

const { authenticate } = require("../middleware/auth");
const { getQueryFilter } = require("../utils/queryHelper");

// ======================================================
// AUTHENTICATION
// ======================================================

router.use(authenticate);


// ======================================================
// ADMIN - GET ALL ELECTIONS
// Admin can see ALL users' elections
// ======================================================

router.get("/admin", async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        error: "Admin access required.",
      });
    }

    const elections = await Election.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: elections,
    });
  } catch (error) {
    console.error("Error fetching admin elections:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// ======================================================
// COMMITTEE - GET COMMITTEE ELECTIONS ONLY
// Each Committee user sees ONLY their own elections
// ======================================================

router.get("/committee", async (req, res) => {
  try {
    if (
      req.user.role !== "Admin" &&
      req.user.panel !== "Committee"
    ) {
      return res.status(403).json({
        success: false,
        error: "Committee access required.",
      });
    }

    const filter = getQueryFilter(req, {
      source: "committee",
    });

    const elections = await Election.find(filter)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: elections,
    });
  } catch (error) {
    console.error("Error fetching committee elections:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// ======================================================
// ADMIN - CREATE ELECTION
// Backend controls source + owner
// ======================================================

router.post("/admin", async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        error: "Admin access required.",
      });
    }

    const newElection = new Election({
      ...req.body,

      // Backend-controlled ownership
      user: req.user._id,

      // Never trust frontend for source
      source: "admin",
    });

    const savedElection = await newElection.save();

    res.status(201).json({
      success: true,
      data: savedElection,
    });
  } catch (error) {
    console.error("Error creating admin election:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Duplicate Election ID already exists.",
      });
    }

    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});


// ======================================================
// COMMITTEE - CREATE ELECTION
// Backend controls source + owner
// ======================================================

router.post("/committee", async (req, res) => {
  try {
    if (req.user.panel !== "Committee") {
      return res.status(403).json({
        success: false,
        error: "Committee access required.",
      });
    }

    const newElection = new Election({
      ...req.body,

      // IMPORTANT:
      // Owner comes from logged-in user, NOT frontend
      user: req.user._id,

      // Backend controls source
      source: "committee",
    });

    const savedElection = await newElection.save();

    res.status(201).json({
      success: true,
      data: savedElection,
    });
  } catch (error) {
    console.error("Error creating committee election:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Duplicate Election ID already exists.",
      });
    }

    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});


// ======================================================
// GENERATE PDF
// User can only download an election they are allowed
// to access. Admin can download any election.
// ======================================================

router.get("/:id/pdf", async (req, res) => {
  try {
    const election = await Election.findOne(
      getQueryFilter(req, {
        _id: req.params.id,
      })
    );

    if (!election) {
      return res.status(404).json({
        success: false,
        error: "Election not found.",
      });
    }

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      `inline; filename=election-${election.electionId}.pdf`
    );

    const doc = new PDFDocument({
      margin: 50,
    });

    doc.pipe(res);

    doc
      .fontSize(22)
      .fillColor("#166534")
      .text("Hisab-Ul-Khair", {
        align: "center",
      });

    doc
      .fontSize(12)
      .fillColor("#555555")
      .text("Election Management Report", {
        align: "center",
      });

    doc.moveDown(2);

    doc
      .fontSize(16)
      .fillColor("#000000")
      .text("Election Details", {
        underline: true,
      });

    doc.moveDown(1);

    doc.fontSize(12);

    doc.text(`Election ID: ${election.electionId}`);
    doc.text(`Election Title: ${election.electionTitle}`);
    doc.text(`Election Type: ${election.electionType}`);
    doc.text(`Vote Type: ${election.voteType}`);
    doc.text(`Status: ${election.status}`);
    doc.text(`Result Visibility: ${election.resultVisibility}`);
    doc.text(`Source: ${election.source}`);

    if (election.startTime) {
      doc.text(`Start Time: ${election.startTime}`);
    }

    if (election.endTime) {
      doc.text(`End Time: ${election.endTime}`);
    }

    doc.moveDown(4);

    doc
      .fontSize(10)
      .fillColor("#888888")
      .text(
        "This is a system-generated electronic document.",
        {
          align: "center",
        }
      );

    doc.end();
  } catch (error) {
    console.error("Error generating election PDF:", error);

    res.status(500).json({
      success: false,
      error: "Server Error generating election PDF",
    });
  }
});


module.exports = router;