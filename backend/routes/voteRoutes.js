const express = require("express");
const router = express.Router();

const Vote = require("../models/Vote");
const { authenticate } = require("../middleware/auth");
const { getQueryFilter } = require("../utils/queryHelper");

router.use(authenticate);

// GET: All votes
router.get("/", async (req, res) => {
  try {
    const votes = await Vote.find(
      getQueryFilter(req)
    ).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: votes,
    });
  } catch (error) {
    console.error("Error fetching votes:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET: Single vote
router.get("/:id", async (req, res) => {
  try {
    const vote = await Vote.findOne(
      getQueryFilter(req, { _id: req.params.id })
    );

    if (!vote) {
      return res.status(404).json({
        success: false,
        error: "Vote not found.",
      });
    }

    res.json({
      success: true,
      data: vote,
    });
  } catch (error) {
    console.error("Error fetching vote:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// POST: Create vote
router.post("/", async (req, res) => {
  try {
    const newVote = new Vote({
      ...req.body,
      user: req.user._id,
    });

    const savedVote = await newVote.save();

    res.status(201).json({
      success: true,
      data: savedVote,
    });
  } catch (error) {
    console.error("Error creating vote:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// PUT: Update vote
router.put("/:id", async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.user.role !== "Admin") {
      updateData.user = req.user._id;
    }

    const updatedVote = await Vote.findOneAndUpdate(
      getQueryFilter(req, { _id: req.params.id }),
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedVote) {
      return res.status(404).json({
        success: false,
        error: "Vote not found.",
      });
    }

    res.json({
      success: true,
      data: updatedVote,
    });
  } catch (error) {
    console.error("Error updating vote:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// DELETE: Delete vote
router.delete("/:id", async (req, res) => {
  try {
    const deletedVote = await Vote.findOneAndDelete(
      getQueryFilter(req, { _id: req.params.id })
    );

    if (!deletedVote) {
      return res.status(404).json({
        success: false,
        error: "Vote not found.",
      });
    }

    res.json({
      success: true,
      message: "Vote deleted successfully.",
      data: deletedVote,
    });
  } catch (error) {
    console.error("Error deleting vote:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;