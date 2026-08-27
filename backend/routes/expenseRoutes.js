const express = require("express");
const router = express.Router();
const Expense = require("../models/expense");
const PDFDocument = require("pdfkit");

// ======================================================
// GET ACCOUNTS EXPENSES
// Accounts can ONLY see expenses created by Accounts
// ======================================================

router.get("/accounts", async (req, res) => {
  try {
    const expenses = await Expense.find({
      source: "accounts",
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: expenses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});


// ======================================================
// GET ADMIN EXPENSES
// Admin can see BOTH Accounts + Admin expenses
// ======================================================

router.get("/admin", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: expenses,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});


// ======================================================
// CREATE EXPENSE FROM ACCOUNTS PANEL
// ======================================================

router.post("/accounts", async (req, res) => {
  try {
    const newExpense = new Expense({
      ...req.body,

      // VERY IMPORTANT
      // We decide the source from the endpoint,
      // not from the frontend.
      source: "accounts",
    });

    const savedExpense = await newExpense.save();

    res.status(201).json({
      success: true,
      data: savedExpense,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
});


// ======================================================
// CREATE EXPENSE FROM ADMIN PANEL
// ======================================================

router.post("/admin", async (req, res) => {
  try {
    const newExpense = new Expense({
      ...req.body,

      // VERY IMPORTANT
      source: "admin",
    });

    const savedExpense = await newExpense.save();

    res.status(201).json({
      success: true,
      data: savedExpense,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
});


// ======================================================
// PDF RECEIPT
// ======================================================

router.get("/:id/pdf", async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        error: "Expense not found",
      });
    }

    const doc = new PDFDocument();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Expense-${expense._id}.pdf`
    );

    doc.pipe(res);

    doc
      .fontSize(20)
      .text("Hisab-ul-Khair - Expense Voucher", {
        align: "center",
      });

    doc.moveDown();

    doc
      .fontSize(12)
      .text(`Receipt Number: ${expense.receiptNumber || "N/A"}`);

    doc.text(`Vendor: ${expense.vendor}`);

    doc.text(`Expense Type: ${expense.expenseType}`);

    doc.text(`Fund Category: ${expense.fundCategory}`);

    doc.text(`Amount: Rs. ${expense.amount}`);

    doc.text(`Status: ${expense.status}`);

    doc.text(
      `Date: ${expense.expenseDate || "N/A"}`
    );

    doc.text(
      `Notes: ${expense.notes || "None"}`
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