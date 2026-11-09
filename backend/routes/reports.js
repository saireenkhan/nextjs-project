const express = require("express");
const router = express.Router();

const Report = require("../models/Report");
const { authenticate } = require("../middleware/auth");
const { getQueryFilter } = require("../utils/queryHelper");

router.use(authenticate);

// GET: All reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find(
      getQueryFilter(req)
    ).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: reports,
    });
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET: Single report
router.get("/:id", async (req, res) => {
  try {
    const report = await Report.findOne(
      getQueryFilter(req, { _id: req.params.id })
    );

    if (!report) {
      return res.status(404).json({
        success: false,
        error: "Report not found.",
      });
    }

    res.json({
      success: true,
      data: report,
    });
  } catch (error) {
    console.error("Error fetching report:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// POST: Create report
router.post("/", async (req, res) => {
  try {
    const newReport = new Report({
      ...req.body,
      user: req.user._id,
    });

    const savedReport = await newReport.save();

    res.status(201).json({
      success: true,
      data: savedReport,
    });
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// PUT: Update report
router.put("/:id", async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.user.role !== "Admin") {
      updateData.user = req.user._id;
    }

    const updatedReport = await Report.findOneAndUpdate(
      getQueryFilter(req, { _id: req.params.id }),
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedReport) {
      return res.status(404).json({
        success: false,
        error: "Report not found.",
      });
    }

    res.json({
      success: true,
      data: updatedReport,
    });
  } catch (error) {
    console.error("Error updating report:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// DELETE: Delete report
router.delete("/:id", async (req, res) => {
  try {
    const deletedReport = await Report.findOneAndDelete(
      getQueryFilter(req, { _id: req.params.id })
    );

    if (!deletedReport) {
      return res.status(404).json({
        success: false,
        error: "Report not found.",
      });
    }

    res.json({
      success: true,
      message: "Report deleted successfully.",
      data: deletedReport,
    });
  } catch (error) {
    console.error("Error deleting report:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;