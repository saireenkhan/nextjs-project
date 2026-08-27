const express = require("express");
const router = express.Router();
const Election = require("../models/Election");
const PDFDocument = require("pdfkit");

// ======================================================
// ADMIN - GET ALL ELECTIONS
// Admin can see BOTH admin + committee elections
// ======================================================

router.get("/admin", async (req, res) => {
  try {
    const elections = await Election.find().sort({
      createdAt: -1,
    });

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
// ======================================================

router.get("/committee", async (req, res) => {
  try {
    const elections = await Election.find({
      source: "committee",
    }).sort({
      createdAt: -1,
    });

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
// Backend decides source = admin
// ======================================================

router.post("/admin", async (req, res) => {
  try {
    const newElection = new Election({
      ...req.body,

      // IMPORTANT
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
// Backend decides source = committee
// ======================================================

router.post("/committee", async (req, res) => {
  try {
    const newElection = new Election({
      ...req.body,

      // IMPORTANT
      // Never trust frontend for source
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
// ======================================================

router.get("/:id/pdf", async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);

    if (!election) {
      return res.status(404).send("Election not found");
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

    res.status(500).send(
      "Server Error generating election PDF"
    );
  }
});


module.exports = router;