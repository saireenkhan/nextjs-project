const express = require("express");
const PDFDocument = require("pdfkit");

const Donation = require("../models/donation");
const { authenticate } = require("../middleware/auth");
const { getQueryFilter } = require("../utils/queryHelper");

const router = express.Router();


// ============================================================
// AUTHENTICATION
// ============================================================

router.use(authenticate);


// ============================================================
// CREATE DONATION
// POST /api/donations
//
// The logged-in user's ID is automatically stored.
// The frontend cannot decide who owns the donation.
// ============================================================

router.post("/", async (req, res) => {
  try {
    const newDonation = new Donation({
      ...req.body,

      // Backend-controlled ownership
      user: req.user._id,

      // Backend-controlled panel
      panel:
        req.user.role === "Admin"
          ? "admin"
          : req.user.panel,
    });

    const savedDonation = await newDonation.save();

    return res.status(201).json({
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

    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});


// ============================================================
// GET DONATIONS
// GET /api/donations
//
// Admin:
//    → ALL donations
//
// Normal user:
//    → ONLY their own donations
//
// Optional panel filter:
//    /api/donations?panel=Accounts
// ============================================================

router.get("/", async (req, res) => {
  try {
    const { panel } = req.query;

    const extraFilter = {};

    if (panel) {
      extraFilter.panel = panel;
    }

    const filter = getQueryFilter(req, extraFilter);

    const donations = await Donation.find(filter)
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: donations,
    });
  } catch (error) {
    console.error("Fetch donations error:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// ============================================================
// GET SINGLE DONATION
// GET /api/donations/:id
//
// Admin:
//    → Can access any donation
//
// Normal user:
//    → Can access only their own donation
// ============================================================

router.get("/:id", async (req, res) => {
  try {
    const donation = await Donation.findOne(
      getQueryFilter(req, {
        _id: req.params.id,
      })
    );

    if (!donation) {
      return res.status(404).json({
        success: false,
        error: "Donation not found.",
      });
    }

    return res.json({
      success: true,
      data: donation,
    });
  } catch (error) {
    console.error("Fetch single donation error:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// ============================================================
// GET SINGLE DONATION PDF
// GET /api/donations/:id/pdf
//
// IMPORTANT:
// This route MUST come before /:id.
//
// Normal user:
//    → Can generate PDF ONLY for their own donation
//
// Admin:
//    → Can generate PDF for any donation
// ============================================================

router.get("/:id/pdf", async (req, res) => {
  try {
    const donation = await Donation.findOne(
      getQueryFilter(req, {
        _id: req.params.id,
      })
    );

    if (!donation) {
      return res.status(404).json({
        success: false,
        error: "Donation not found.",
      });
    }

    const doc = new PDFDocument({
      margin: 50,
    });

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

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
      .text(
        `Receipt Number: ${donation.receiptNumber || "N/A"}`
      );

    doc.text(
      `Panel: ${donation.panel || "N/A"}`
    );

    doc.text(
      `Donor Name: ${donation.donorName || "N/A"}`
    );

    doc.text(
      `Donor Phone: ${donation.donorPhone || "N/A"}`
    );

    doc.text(
      `Donation Type: ${donation.donationType || "N/A"}`
    );

    doc.text(
      `Fund Category: ${donation.fundCategory || "N/A"}`
    );

    doc.text(
      `Amount: Rs. ${donation.amount || 0}`
    );

    doc.text(
      `Status: ${donation.status || "N/A"}`
    );

    doc.text(
      `Donation Date: ${
        donation.donationDate ||
        (
          donation.createdAt
            ? new Date(donation.createdAt).toLocaleDateString()
            : "N/A"
        )
      }`
    );

    if (donation.notes) {
      doc.text(`Notes: ${donation.notes}`);
    }


    // ========================================================
    // FOOTER
    // ========================================================

    doc.moveDown(4);

    doc
      .fontSize(10)
      .fillColor("#777777")
      .text(
        "Thank you for your generous contribution!",
        {
          align: "center",
        }
      );

    doc.end();

  } catch (error) {
    console.error("PDF generation error:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// ============================================================
// UPDATE DONATION
// ============================================================

router.put("/:id", async (req, res) => {
  try {
    const filter = getQueryFilter(req, {
      _id: req.params.id,
    });

    const updateData = {
      ...req.body,
    };

    // Never allow frontend to change owner
    delete updateData.user;

    // Never allow frontend to change MongoDB ID
    delete updateData._id;

    // Never allow frontend to change panel
    delete updateData.panel;

    const updatedDonation =
      await Donation.findOneAndUpdate(
        filter,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedDonation) {
      return res.status(404).json({
        success: false,
        error: "Donation not found.",
      });
    }

    return res.json({
      success: true,
      data: updatedDonation,
    });
  } catch (error) {
    console.error("Update donation error:", error);

    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});


// ============================================================
// DELETE DONATION
// ============================================================

router.delete("/:id", async (req, res) => {
  try {
    const filter = getQueryFilter(req, {
      _id: req.params.id,
    });

    const deletedDonation =
      await Donation.findOneAndDelete(filter);

    if (!deletedDonation) {
      return res.status(404).json({
        success: false,
        error: "Donation not found.",
      });
    }

    return res.json({
      success: true,
      message: "Donation deleted successfully.",
    });
  } catch (error) {
    console.error("Delete donation error:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


module.exports = router;