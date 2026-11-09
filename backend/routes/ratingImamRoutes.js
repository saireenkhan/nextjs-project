const express = require("express");
const router = express.Router();

const RatingImam = require("../models/RatingImam");
const { authenticate } = require("../middleware/auth");
const { getQueryFilter } = require("../utils/queryHelper");

router.use(authenticate);

// GET: All Imam ratings
router.get("/", async (req, res) => {
  try {
    const ratings = await RatingImam.find(
      getQueryFilter(req)
    ).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: ratings,
    });
  } catch (error) {
    console.error("Error fetching Imam ratings:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET: Single Imam rating
router.get("/:id", async (req, res) => {
  try {
    const rating = await RatingImam.findOne(
      getQueryFilter(req, { _id: req.params.id })
    );

    if (!rating) {
      return res.status(404).json({
        success: false,
        error: "Imam rating not found.",
      });
    }

    res.json({
      success: true,
      data: rating,
    });
  } catch (error) {
    console.error("Error fetching Imam rating:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// POST: Create Imam rating
router.post("/", async (req, res) => {
  try {
    const newRating = new RatingImam({
      ...req.body,
      user: req.user._id,
    });

    const savedRating = await newRating.save();

    res.status(201).json({
      success: true,
      data: savedRating,
    });
  } catch (error) {
    console.error("Error creating Imam rating:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// PUT: Update Imam rating
router.put("/:id", async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.user.role !== "Admin") {
      updateData.user = req.user._id;
    }

    const updatedRating = await RatingImam.findOneAndUpdate(
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
        error: "Imam rating not found.",
      });
    }

    res.json({
      success: true,
      data: updatedRating,
    });
  } catch (error) {
    console.error("Error updating Imam rating:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// DELETE: Delete Imam rating
router.delete("/:id", async (req, res) => {
  try {
    const deletedRating = await RatingImam.findOneAndDelete(
      getQueryFilter(req, { _id: req.params.id })
    );

    if (!deletedRating) {
      return res.status(404).json({
        success: false,
        error: "Imam rating not found.",
      });
    }

    res.json({
      success: true,
      message: "Imam rating deleted successfully.",
      data: deletedRating,
    });
  } catch (error) {
    console.error("Error deleting Imam rating:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;