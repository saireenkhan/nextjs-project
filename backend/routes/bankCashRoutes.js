const express = require("express");
const router = express.Router();
const BankCash = require("../models/bankCash");
const PDFDocument = require("pdfkit");

// GET: Generate PDF Receipt
router.get("/:id/pdf", async (req, res) => {
  try {
    const record = await BankCash.findById(req.params.id);
    if (!record) {
      return res.status(404).send("Transaction not found for PDF");
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename=bank-cash-${record.transactionId}.pdf`);

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res);

    doc.fontSize(22).fillColor("#166534").text("Hisab-Ul-Khair", { align: "center" });
    doc.fontSize(12).fillColor("#555555").text("Bank & Cash Book Transaction Report", { align: "center" });
    doc.moveDown(2);

    doc.fontSize(16).fillColor("#000000").text("Transaction Summary", { underline: true });
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
    doc.fontSize(10).fillColor("#888888").text("This is a system-generated electronic document.", { align: "center" });

    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Server Error generating PDF");
  }
});


// ======================================================
// GET ACCOUNTS TRANSACTIONS
// Accounts can ONLY see transactions created by Accounts
// ======================================================

router.get("/accounts", async (req, res) => {
  try {
    const list = await BankCash.find({
      source: "accounts",
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
// GET ADMIN TRANSACTIONS
// Admin can see BOTH Accounts + Admin transactions
// ======================================================

router.get("/admin", async (req, res) => {
  try {
    const list = await BankCash.find().sort({
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
// CREATE TRANSACTION FROM ACCOUNTS PANEL
// ======================================================

router.post("/accounts", async (req, res) => {
  try {
    const newRecord = new BankCash({
      ...req.body,

      // VERY IMPORTANT
      // We decide the source from the endpoint,
      // not from the frontend.
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
// ======================================================

router.post("/admin", async (req, res) => {
  try {
    const newRecord = new BankCash({
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
    console.error("Error saving transaction:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;