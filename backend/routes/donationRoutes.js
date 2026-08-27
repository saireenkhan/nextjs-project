const express = require("express");
const PDFDocument = require("pdfkit");
const Donation = require("../models/donation");

const router = express.Router();


// ============================================================
// CREATE DONATION
// POST /api/donations
// ============================================================

router.post("/", async (req, res) => {
  try {
    const newDonation = new Donation(req.body);

    const savedDonation = await newDonation.save();

    res.status(201).json({
      success: true,
      data: savedDonation,
    });
  } catch (error) {
    console.error("Create donation error:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Receipt Number already exists.",
      });
    }

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// ============================================================
// GET DONATIONS
//
// /api/donations
// → Admin master view → ALL donations
//
// /api/donations?panel=accounts
// → Accounts → ONLY Accounts donations
//
// /api/donations?panel=controller
// → Controller → ONLY Controller donations
// ============================================================

router.get("/", async (req, res) => {
  try {
    const { panel } = req.query;

    let filter = {};

    // If panel is provided, only return that panel's records.
    if (panel) {
      filter.panel = panel;
    }

    const donations = await Donation.find(filter).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: donations,
    });
  } catch (error) {
    console.error("Fetch donations error:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// ============================================================
// GET SINGLE DONATION PDF
// GET /api/donations/:id/pdf
// ============================================================

router.get("/:id/pdf", async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({
        success: false,
        error: "Donation not found",
      });
    }

    const doc = new PDFDocument({
      margin: 50,
    });

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      `inline; filename=receipt-${donation._id}.pdf`
    );

    doc.pipe(res);

    // ========================================================
    // PDF HEADER
    // ========================================================

    doc
      .fontSize(22)
      .fillColor("#166534")
      .text("HISAB-UL-KHAIR", {
        align: "center",
      });

    doc
      .fontSize(12)
      .fillColor("#555555")
      .text("Official Donation Receipt", {
        align: "center",
      });

    doc.moveDown(2);

    // ========================================================
    // DONATION INFORMATION
    // ========================================================

    doc
      .fontSize(12)
      .fillColor("#000000")
      .text(`Receipt Number: ${donation.receiptNumber || "N/A"}`);

    doc.text(`Panel: ${donation.panel || "N/A"}`);

    doc.text(`Donor Name: ${donation.donorName || "N/A"}`);

    doc.text(`Donor Phone: ${donation.donorPhone || "N/A"}`);

    doc.text(`Donation Type: ${donation.donationType || "N/A"}`);

    doc.text(`Fund Category: ${donation.fundCategory || "N/A"}`);

    doc.text(`Amount: Rs. ${donation.amount || 0}`);

    doc.text(`Status: ${donation.status || "N/A"}`);

    doc.text(
      `Donation Date: ${
        donation.donationDate ||
        new Date(donation.createdAt).toLocaleDateString()
      }`
    );

    if (donation.notes) {
      doc.text(`Notes: ${donation.notes}`);
    }

    doc.moveDown(4);

    doc
      .fontSize(10)
      .fillColor("#777777")
      .text("Thank you for your generous contribution!", {
        align: "center",
      });

    doc.end();
  } catch (error) {
    console.error("PDF generation error:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


module.exports = router;