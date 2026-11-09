const express = require("express");
const router = express.Router();

const Fund = require("../models/fund");

const { authenticate } = require("../middleware/auth");
const { getQueryFilter } = require("../utils/queryHelper");

router.use(authenticate);


// ======================================================
// ADMIN - GET ALL FUNDS
// ======================================================

router.get("/admin", async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        error: "Admin access required.",
      });
    }

    const funds = await Fund.find()
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: funds,
    });
  } catch (error) {
    console.error("Error fetching admin funds:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// ======================================================
// GET ALL FUNDS
//
// Admin  -> all funds
// Others -> only their own funds
// ======================================================

router.get("/", async (req, res) => {
  try {
    const filter = getQueryFilter(req);

    const funds = await Fund.find(filter)
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: funds,
    });
  } catch (error) {
    console.error("Error fetching funds:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// ======================================================
// CREATE FUND
// Owner comes from authenticated user
// ======================================================

router.post("/", async (req, res) => {
  try {
    const newFund = new Fund({
      ...req.body,

      // Never trust frontend for owner
      user: req.user._id,
    });

    const savedFund = await newFund.save();

    return res.status(201).json({
      success: true,
      data: savedFund,
    });
  } catch (error) {
    console.error("Error creating fund:", error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Duplicate fund already exists.",
      });
    }

    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});


// ======================================================
// GET SINGLE FUND
//
// Admin  -> any fund
// Others -> only their own fund
// ======================================================

router.get("/:id", async (req, res) => {
  try {
    const fund = await Fund.findOne(
      getQueryFilter(req, {
        _id: req.params.id,
      })
    );

    if (!fund) {
      return res.status(404).json({
        success: false,
        error: "Fund not found.",
      });
    }

    return res.json({
      success: true,
      data: fund,
    });
  } catch (error) {
    console.error("Error fetching fund:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// ======================================================
// UPDATE FUND
// ======================================================

router.put("/:id", async (req, res) => {
  try {
    const filter = getQueryFilter(req, {
      _id: req.params.id,
    });

    const updateData = {
      ...req.body,
    };

    // Prevent frontend from changing ownership
    delete updateData.user;
    delete updateData._id;

    const updatedFund = await Fund.findOneAndUpdate(
      filter,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedFund) {
      return res.status(404).json({
        success: false,
        error: "Fund not found.",
      });
    }

    return res.json({
      success: true,
      data: updatedFund,
    });
  } catch (error) {
    console.error("Error updating fund:", error);

    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});


// ======================================================
// DELETE FUND
// ======================================================

router.delete("/:id", async (req, res) => {
  try {
    const filter = getQueryFilter(req, {
      _id: req.params.id,
    });

    const deletedFund = await Fund.findOneAndDelete(filter);

    if (!deletedFund) {
      return res.status(404).json({
        success: false,
        error: "Fund not found.",
      });
    }

    return res.json({
      success: true,
      message: "Fund deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting fund:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


module.exports = router;