const express = require("express");
const router = express.Router();
const Fund = require("../models/fund");
const PDFDocument = require("pdfkit");

// ======================================================
// GET ACCOUNTS FUNDS
// Accounts can ONLY see funds created by Accounts
// ======================================================

router.get("/accounts", async (req, res) => {
  try {
    const funds = await Fund.find({
      source: "accounts",
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: funds,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});


// ======================================================
// GET ADMIN FUNDS
// Admin can see BOTH Accounts + Admin funds
// ======================================================

router.get("/admin", async (req, res) => {
  try {
    const funds = await Fund.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: funds,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});


// ======================================================
// CREATE FUND FROM ACCOUNTS PANEL
// ======================================================

router.post("/accounts", async (req, res) => {
  try {
    const newFund = new Fund({
      ...req.body,

      // VERY IMPORTANT
      // We decide the source from the endpoint,
      // not from the frontend.
      source: "accounts",
    });

    const savedFund = await newFund.save();

    res.status(201).json({
      success: true,
      data: savedFund,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
});


// ======================================================
// CREATE FUND FROM ADMIN PANEL
// ======================================================

router.post("/admin", async (req, res) => {
  try {
    const newFund = new Fund({
      ...req.body,

      // VERY IMPORTANT
      source: "admin",
    });

    const savedFund = await newFund.save();

    res.status(201).json({
      success: true,
      data: savedFund,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
});


// ======================================================
// PDF / LEDGER VOUCHER
//
// NOTE: both frontends now point here. Accounts previously
// called a "/ledger" path and Admin called "/pdf" — neither
// existed on the backend. Unified to one route, matching the
// Expense module's convention, so both panels get a working
// receipt/voucher.
// ======================================================

router.get("/:id/pdf", async (req, res) => {
  try {
    const fund = await Fund.findById(req.params.id);

    if (!fund) {
      return res.status(404).json({
        success: false,
        error: "Fund not found",
      });
    }

    const doc = new PDFDocument();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Fund-${fund._id}.pdf`
    );

    doc.pipe(res);

    doc
      .fontSize(20)
      .text("Hisab-ul-Khair - Fund Ledger", {
        align: "center",
      });

    doc.moveDown();

    doc
      .fontSize(12)
      .text(`Fund Code: ${fund.fundCode || "N/A"}`);

    doc.text(`Fund Name: ${fund.fundName}`);

    doc.text(`Ledger Type: ${fund.ledgerType}`);

    doc.text(`Opening Balance: Rs. ${fund.openingBalance}`);

    doc.text(`Current Balance: Rs. ${fund.currentBalance}`);

    doc.text(`Status: ${fund.status}`);

    doc.text(
      `Description: ${fund.description || "None"}`
    );

    doc.end();
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;