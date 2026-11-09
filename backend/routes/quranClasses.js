const express = require("express");
const router = express.Router();

const QuranClass = require("../models/QuranClass");
const { authenticate } = require("../middleware/auth");
const { getQueryFilter } = require("../utils/queryHelper");

router.use(authenticate);

// GET: All Quran classes
router.get("/", async (req, res) => {
  try {
    const classes = await QuranClass.find(
      getQueryFilter(req)
    ).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: classes,
    });
  } catch (error) {
    console.error("Error fetching Quran classes:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET: Single Quran class
router.get("/:id", async (req, res) => {
  try {
    const quranClass = await QuranClass.findOne(
      getQueryFilter(req, { _id: req.params.id })
    );

    if (!quranClass) {
      return res.status(404).json({
        success: false,
        error: "Quran class not found.",
      });
    }

    res.json({
      success: true,
      data: quranClass,
    });
  } catch (error) {
    console.error("Error fetching Quran class:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// POST: Create Quran class
router.post("/", async (req, res) => {
  try {
    const newClass = new QuranClass({
      ...req.body,
      user: req.user._id,
    });

    const savedClass = await newClass.save();

    res.status(201).json({
      success: true,
      data: savedClass,
    });
  } catch (error) {
    console.error("Error creating Quran class:", error);

    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// PUT: Update Quran class
router.put("/:id", async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };

    // Prevent non-admin users from changing ownership
    if (req.user.role !== "Admin") {
      updateData.user = req.user._id;
    }

    const updatedClass = await QuranClass.findOneAndUpdate(
      getQueryFilter(req, { _id: req.params.id }),
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedClass) {
      return res.status(404).json({
        success: false,
        error: "Quran class not found.",
      });
    }

    res.json({
      success: true,
      data: updatedClass,
    });
  } catch (error) {
    console.error("Error updating Quran class:", error);

    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// DELETE: Delete Quran class
router.delete("/:id", async (req, res) => {
  try {
    const deletedClass = await QuranClass.findOneAndDelete(
      getQueryFilter(req, { _id: req.params.id })
    );

    if (!deletedClass) {
      return res.status(404).json({
        success: false,
        error: "Quran class not found.",
      });
    }

    res.json({
      success: true,
      message: "Quran class deleted successfully.",
      data: deletedClass,
    });
  } catch (error) {
    console.error("Error deleting Quran class:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;