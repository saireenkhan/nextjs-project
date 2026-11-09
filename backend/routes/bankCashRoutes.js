const express = require("express");
const router = express.Router();

const BankCash = require("../models/bankCash");
const PDFDocument = require("pdfkit");

const { authenticate } = require("../middleware/auth");
const { getQueryFilter } = require("../utils/queryHelper");

// ======================================================
// GET PDF
// User can only generate PDF for their own transaction
// Admin can generate PDF for any transaction
// ======================================================

router.get("/:id/pdf", authenticate, async (req, res) => {
  try {
    const record = await BankCash.findOne(
      getQueryFilter(req, {
        _id: req.params.id,
      })
    );

    if (!record) {
      return res.status(404).send("Transaction not found for PDF");
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename=bank-cash-${record.transactionId}.pdf`
    );

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res);

    doc
      .fontSize(22)
      .fillColor("#166534")
      .text("Hisab-Ul-Khair", { align: "center" });

    doc
      .fontSize(12)
      .fillColor("#555555")
      .text("Bank & Cash Book Transaction Report", {
        align: "center",
      });

    doc.moveDown(2);

    doc
      .fontSize(16)
      .fillColor("#000000")
      .text("Transaction Summary", { underline: true });

    doc.moveDown(1);

    doc.fontSize(12).text(`Transaction ID: ${record.transactionId}`);
    doc.text(`Account Type: ${record.accountType}`);
    doc.text(`Bank Name: ${record.bankName || "N/A"}`);
    doc.text(`Transaction Type: ${record.transactionType}`);
    doc.text(`Amount: Rs. ${record.amount?.toLocaleString()}`);
    doc.text(`Reference No: ${record.referenceNumber || "N/A"}`);
    doc.text(`Status: ${record.status}`);
    doc.text(`Remarks: ${record.remarks || "N/A"}`);

    doc.moveDown(4);

    doc
      .fontSize(10)
      .fillColor("#888888")
      .text("This is a system-generated electronic document.", {
        align: "center",
      });

    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);

    res.status(500).send("Server Error generating PDF");
  }
});

// ======================================================
// GET ACCOUNTS TRANSACTIONS
// Accounts users see ONLY their own Accounts transactions
// Admin can see Accounts transactions too
// ======================================================

router.get("/accounts", authenticate, async (req, res) => {
  try {
    if (req.user.role !== "Admin" && req.user.panel !== "Accounts") {
      return res.status(403).json({
        success: false,
        error: "Access denied",
      });
    }

    const filter = getQueryFilter(req, {
      source: "accounts",
    });

    const list = await BankCash.find(filter).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: list,
    });
  } catch (error) {
    console.error("Error fetching Accounts transactions:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ======================================================
// GET ADMIN TRANSACTIONS
// Admin sees ALL users' transactions
// ======================================================

router.get("/admin", authenticate, async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        error: "Admin access required",
      });
    }

    const list = await BankCash.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: list,
    });
  } catch (error) {
    console.error("Error fetching Admin transactions:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ======================================================
// CREATE TRANSACTION FROM ACCOUNTS PANEL
// Ownership comes from logged-in user
// NOT from frontend
// ======================================================

router.post("/accounts", authenticate, async (req, res) => {
  try {
    if (req.user.role !== "Admin" && req.user.panel !== "Accounts") {
      return res.status(403).json({
        success: false,
        error: "Access denied",
      });
    }

    const newRecord = new BankCash({
      ...req.body,

      // Never trust frontend ownership
      user: req.user._id,

      // Source is controlled by the endpoint
      source: "accounts",
    });

    const saved = await newRecord.save();

    res.status(201).json({
      success: true,
      data: saved,
    });
  } catch (error) {
    console.error("Error saving transaction:", error);

    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// ======================================================
// CREATE TRANSACTION FROM ADMIN PANEL
// Admin creates data owned by Admin
// ======================================================

router.post("/admin", authenticate, async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        error: "Admin access required",
      });
    }

    const newRecord = new BankCash({
      ...req.body,

      // Admin's own user ID
      user: req.user._id,

      // Source is controlled by backend
      source: "admin",
    });

    const saved = await newRecord.save();

    res.status(201).json({
      success: true,
      data: saved,
    });
  } catch (error) {
    console.error("Error saving Admin transaction:", error);

    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;