const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");

const Expense = require("../models/expense");

const { authenticate } = require("../middleware/auth");
const { getQueryFilter } = require("../utils/queryHelper");

router.use(authenticate);


// ======================================================
// ADMIN - GET ALL EXPENSES
// ======================================================

router.get("/admin", async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        error: "Admin access required.",
      });
    }

    const expenses = await Expense.find()
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: expenses,
    });
  } catch (error) {
    console.error("Error fetching admin expenses:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// ======================================================
// GET ALL EXPENSES
//
// Admin  -> all expenses
// Others -> only their own expenses
// ======================================================

router.get("/", async (req, res) => {
  try {
    const filter = getQueryFilter(req);

    const expenses = await Expense.find(filter)
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: expenses,
    });
  } catch (error) {
    console.error("Error fetching expenses:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// ======================================================
// CREATE EXPENSE
// ======================================================

router.post("/", async (req, res) => {
  try {
    const newExpense = new Expense({
      ...req.body,

      // Backend-controlled owner
      user: req.user._id,
    });

    const savedExpense = await newExpense.save();

    return res.status(201).json({
      success: true,
      data: savedExpense,
    });
  } catch (error) {
    console.error("Error creating expense:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Duplicate expense already exists.",
      });
    }

    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});


// ======================================================
// PDF
//
// IMPORTANT: This MUST be before /:id
// ======================================================

router.get("/:id/pdf", async (req, res) => {
  try {
    const expense = await Expense.findOne(
      getQueryFilter(req, {
        _id: req.params.id,
      })
    );

    if (!expense) {
      return res.status(404).json({
        success: false,
        error: "Expense not found.",
      });
    }

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      `inline; filename=expense-${expense._id}.pdf`
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
      .text("Expense Management Report", {
        align: "center",
      });

    doc.moveDown(2);

    doc
      .fontSize(16)
      .fillColor("#000000")
      .text("Expense Details", {
        underline: true,
      });

    doc.moveDown(1);

    doc.fontSize(12);

    // Common expense fields
    if (expense.expenseId) {
      doc.text(`Expense ID: ${expense.expenseId}`);
    }

    if (expense.category) {
      doc.text(`Category: ${expense.category}`);
    }

    if (expense.vendor) {
      doc.text(`Vendor: ${expense.vendor}`);
    }

    if (expense.amount !== undefined) {
      doc.text(`Amount: Rs. ${expense.amount}`);
    }

    if (expense.fundCategory) {
      doc.text(`Fund Category: ${expense.fundCategory}`);
    }

    if (expense.receiptNumber) {
      doc.text(`Receipt Number: ${expense.receiptNumber}`);
    }

    if (expense.status) {
      doc.text(`Status: ${expense.status}`);
    }

    if (expense.description) {
      doc.moveDown(1);
      doc.text(`Description: ${expense.description}`);
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
    console.error("Error generating expense PDF:", error);

    return res.status(500).json({
      success: false,
      error: "Server Error generating expense PDF",
    });
  }
});


// ======================================================
// GET SINGLE EXPENSE
// ======================================================

router.get("/:id", async (req, res) => {
  try {
    const expense = await Expense.findOne(
      getQueryFilter(req, {
        _id: req.params.id,
      })
    );

    if (!expense) {
      return res.status(404).json({
        success: false,
        error: "Expense not found.",
      });
    }

    return res.json({
      success: true,
      data: expense,
    });
  } catch (error) {
    console.error("Error fetching expense:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// ======================================================
// UPDATE EXPENSE
// ======================================================

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
    delete updateData._id;

    const updatedExpense = await Expense.findOneAndUpdate(
      filter,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedExpense) {
      return res.status(404).json({
        success: false,
        error: "Expense not found.",
      });
    }

    return res.json({
      success: true,
      data: updatedExpense,
    });
  } catch (error) {
    console.error("Error updating expense:", error);

    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});


// ======================================================
// DELETE EXPENSE
// ======================================================

router.delete("/:id", async (req, res) => {
  try {
    const filter = getQueryFilter(req, {
      _id: req.params.id,
    });

    const deletedExpense = await Expense.findOneAndDelete(filter);

    if (!deletedExpense) {
      return res.status(404).json({
        success: false,
        error: "Expense not found.",
      });
    }

    return res.json({
      success: true,
      message: "Expense deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting expense:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


module.exports = router;