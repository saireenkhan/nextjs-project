const express = require("express");
const router = express.Router();

const Ratting = require("../models/Ratting");
const { authenticate } = require("../middleware/auth");
const { getQueryFilter } = require("../utils/queryHelper");

router.use(authenticate);

// GET: All ratings
router.get("/", async (req, res) => {
  try {
    const ratings = await Ratting.find(
      getQueryFilter(req)
    ).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: ratings,
    });
  } catch (error) {
    console.error("Error fetching ratings:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET: Single rating
router.get("/:id", async (req, res) => {
  try {
    const rating = await Ratting.findOne(
      getQueryFilter(req, { _id: req.params.id })
    );

    if (!rating) {
      return res.status(404).json({
        success: false,
        error: "Rating not found.",
      });
    }

    res.json({
      success: true,
      data: rating,
    });
  } catch (error) {
    console.error("Error fetching rating:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// POST: Create rating
router.post("/", async (req, res) => {
  try {
    const newRating = new Ratting({
      ...req.body,
      user: req.user._id,
    });

    const savedRating = await newRating.save();

    res.status(201).json({
      success: true,
      data: savedRating,
    });
  } catch (error) {
    console.error("Error creating rating:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// PUT: Update rating
router.put("/:id", async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.user.role !== "Admin") {
      updateData.user = req.user._id;
    }

    const updatedRating = await Ratting.findOneAndUpdate(
      getQueryFilter(req, { _id: req.params.id }),
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedRating) {
      return res.status(404).json({
        success: false,
        error: "Rating not found.",
      });
    }

    res.json({
      success: true,
      data: updatedRating,
    });
  } catch (error) {
    console.error("Error updating rating:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// DELETE: Delete rating
router.delete("/:id", async (req, res) => {
  try {
    const deletedRating = await Ratting.findOneAndDelete(
      getQueryFilter(req, { _id: req.params.id })
    );

    if (!deletedRating) {
      return res.status(404).json({
        success: false,
        error: "Rating not found.",
      });
    }

    res.json({
      success: true,
      message: "Rating deleted successfully.",
      data: deletedRating,
    });
  } catch (error) {
    console.error("Error deleting rating:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;