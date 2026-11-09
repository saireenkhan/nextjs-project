const express = require("express");
const router = express.Router();

const Staff = require("../models/staff");
const { authenticate } = require("../middleware/auth");
const { getQueryFilter } = require("../utils/queryHelper");

router.use(authenticate);

// GET: All staff
router.get("/", async (req, res) => {
  try {
    const staff = await Staff.find(
      getQueryFilter(req)
    ).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: staff,
    });
  } catch (error) {
    console.error("Error fetching staff:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET: Single staff member
router.get("/:id", async (req, res) => {
  try {
    const staffMember = await Staff.findOne(
      getQueryFilter(req, { _id: req.params.id })
    );

    if (!staffMember) {
      return res.status(404).json({
        success: false,
        error: "Staff member not found.",
      });
    }

    res.json({
      success: true,
      data: staffMember,
    });
  } catch (error) {
    console.error("Error fetching staff member:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// POST: Create staff member
router.post("/", async (req, res) => {
  try {
    const newStaff = new Staff({
      ...req.body,
      user: req.user._id,
    });

    const savedStaff = await newStaff.save();

    res.status(201).json({
      success: true,
      data: savedStaff,
    });
  } catch (error) {
    console.error("Error creating staff member:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// PUT: Update staff member
router.put("/:id", async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.user.role !== "Admin") {
      updateData.user = req.user._id;
    }

    const updatedStaff = await Staff.findOneAndUpdate(
      getQueryFilter(req, { _id: req.params.id }),
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedStaff) {
      return res.status(404).json({
        success: false,
        error: "Staff member not found.",
      });
    }

    res.json({
      success: true,
      data: updatedStaff,
    });
  } catch (error) {
    console.error("Error updating staff member:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// DELETE: Delete staff member
router.delete("/:id", async (req, res) => {
  try {
    const deletedStaff = await Staff.findOneAndDelete(
      getQueryFilter(req, { _id: req.params.id })
    );

    if (!deletedStaff) {
      return res.status(404).json({
        success: false,
        error: "Staff member not found.",
      });
    }

    res.json({
      success: true,
      message: "Staff member deleted successfully.",
      data: deletedStaff,
    });
  } catch (error) {
    console.error("Error deleting staff member:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;