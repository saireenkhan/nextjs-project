const express = require("express");
const router = express.Router();
const Voter = require("../models/voter");
const PDFDocument = require("pdfkit");

// GET: Generate PDF / Profile
//
// NOTE: unified onto one route. Admin previously called
// "/:id/pdf" and Committee previously called "/:id/profile" —
// neither of those matched a single consistent backend route.
// Both frontends now point here.

router.get("/:id/pdf", async (req, res) => {
  try {
    const record = await Voter.findById(req.params.id);
    if (!record) {
      return res.status(404).send("Voter not found for PDF");
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename=voter-${record.voterId}.pdf`);

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res);

    doc.fontSize(22).fillColor("#166534").text("Hisab-Ul-Khair", { align: "center" });
    doc.fontSize(12).fillColor("#555555").text("Voter Profile", { align: "center" });
    doc.moveDown(2);

    doc.fontSize(16).fillColor("#000000").text("Voter Summary", { underline: true });
    doc.moveDown(1);

    doc.fontSize(12).text(`Voter ID: ${record.voterId}`);
    doc.text(`Voter Name: ${record.voterName}`);
    doc.text(`CNIC: ${record.cnic || "N/A"}`);
    doc.text(`Phone: ${record.phone || "N/A"}`);
    doc.text(`Verification Method: ${record.verificationMethod || "N/A"}`);
    doc.text(`Voting Status: ${record.votingStatus}`);

    doc.moveDown(4);
    doc.fontSize(10).fillColor("#888888").text("This is a system-generated electronic document.", { align: "center" });

    doc.end();
  } catch (error) {
    console.error("Error generating Voter PDF:", error);
    res.status(500).send("Server Error generating PDF");
  }
});


// ======================================================
// GET COMMITTEE VOTERS
// Committee can ONLY see voters registered by Committee
// ======================================================

router.get("/committee", async (req, res) => {
  try {
    const list = await Voter.find({
      source: "committee",
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: list,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// ======================================================
// GET ADMIN VOTERS
// Admin can see BOTH Committee + Admin voters
// ======================================================

router.get("/admin", async (req, res) => {
  try {
    const list = await Voter.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: list,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// ======================================================
// CREATE VOTER FROM COMMITTEE PANEL
// ======================================================

router.post("/committee", async (req, res) => {
  try {
    const newRecord = new Voter({
      ...req.body,

      // VERY IMPORTANT
      // We decide the source from the endpoint,
      // not from the frontend.
      source: "committee",
    });

    const saved = await newRecord.save();

    res.status(201).json({
      success: true,
      data: saved,
    });
  } catch (error) {
    console.error("Error saving voter:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});


// ======================================================
// CREATE VOTER FROM ADMIN PANEL
// ======================================================

router.post("/admin", async (req, res) => {
  try {
    const newRecord = new Voter({
      ...req.body,

      // VERY IMPORTANT
      source: "admin",
    });

    const saved = await newRecord.save();

    res.status(201).json({
      success: true,
      data: saved,
    });
  } catch (error) {
    console.error("Error saving voter:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;