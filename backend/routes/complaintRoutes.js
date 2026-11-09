const express = require("express");
const router = express.Router();

const Complaint = require("../models/Complaint");
const { authenticate } = require("../middleware/auth");
const { getQueryFilter } = require("../utils/queryHelper");

// ======================================================
// AUTHENTICATION
// ======================================================

router.use(authenticate);


// ======================================================
// GET ADMIN COMPLAINTS
// Admin can see ALL users' complaints
// ======================================================

router.get("/admin", async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        error: "Admin access required.",
      });
    }

    const complaints = await Complaint.find()
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: complaints,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// ======================================================
// GET COMMITTEE COMPLAINTS
// Each Committee user sees ONLY their own complaints
// ======================================================

router.get("/committee", async (req, res) => {
  try {
    if (
      req.user.role !== "Admin" &&
      req.user.panel !== "Committee"
    ) {
      return res.status(403).json({
        success: false,
        error: "Committee access required.",
      });
    }

    const complaints = await Complaint.find(
      getQueryFilter(req, {
        source: "committee",
      })
    ).sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: complaints,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// ======================================================
// GET MOAZZIN COMPLAINTS
// Each Moazzin user sees ONLY their own complaints
// ======================================================

router.get("/moazzin", async (req, res) => {
  try {
    if (
      req.user.role !== "Admin" &&
      req.user.panel !== "Moazzin"
    ) {
      return res.status(403).json({
        success: false,
        error: "Moazzin access required.",
      });
    }

    const complaints = await Complaint.find(
      getQueryFilter(req, {
        source: "moazzin",
      })
    ).sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: complaints,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// ======================================================
// GET MUQTADI COMPLAINTS
// Each Muqtadi user sees ONLY their own complaints
// ======================================================

router.get("/muqtadi", async (req, res) => {
  try {
    if (
      req.user.role !== "Admin" &&
      req.user.panel !== "Muqtadi"
    ) {
      return res.status(403).json({
        success: false,
        error: "Muqtadi access required.",
      });
    }

    const complaints = await Complaint.find(
      getQueryFilter(req, {
        source: "muqtadi",
      })
    ).sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: complaints,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// ======================================================
// CREATE COMPLAINT — ADMIN
// ======================================================

router.post("/admin", async (req, res) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(403).json({
        success: false,
        error: "Admin access required.",
      });
    }

    const newComplaint = new Complaint({
      ...req.body,

      // Ownership is ALWAYS decided by the backend
      user: req.user._id,

      // Source is decided by the endpoint
      source: "admin",
    });

    const savedComplaint = await newComplaint.save();

    return res.status(201).json({
      success: true,
      data: savedComplaint,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Duplicate Complaint ID already exists.",
      });
    }

    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});


// ======================================================
// CREATE COMPLAINT — COMMITTEE
// ======================================================

router.post("/committee", async (req, res) => {
  try {
    if (req.user.panel !== "Committee") {
      return res.status(403).json({
        success: false,
        error: "Committee access required.",
      });
    }

    const complaint = new Complaint({
      ...req.body,
      user: req.user._id,
      source: "committee",
    });

    const savedComplaint = await complaint.save();

    return res.status(201).json({
      success: true,
      data: savedComplaint,
    });
  } catch (error) {
    console.error("Error creating Committee complaint:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// ======================================================
// CREATE COMPLAINT — MOAZZIN
// ======================================================

router.post("/moazzin", async (req, res) => {
  try {
    if (
      req.user.role !== "Admin" &&
      req.user.panel !== "Moazzin"
    ) {
      return res.status(403).json({
        success: false,
        error: "Moazzin access required.",
      });
    }

    const newComplaint = new Complaint({
      ...req.body,

      user: req.user._id,
      source: "moazzin",
    });

    const savedComplaint = await newComplaint.save();

    return res.status(201).json({
      success: true,
      data: savedComplaint,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Duplicate Complaint ID already exists.",
      });
    }

    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});


// ======================================================
// CREATE COMPLAINT — MUQTADI
// ======================================================

router.post("/muqtadi", async (req, res) => {
  try {
    if (
      req.user.role !== "Admin" &&
      req.user.panel !== "Muqtadi"
    ) {
      return res.status(403).json({
        success: false,
        error: "Muqtadi access required.",
      });
    }

    const newComplaint = new Complaint({
      ...req.body,

      user: req.user._id,
      source: "muqtadi",
    });

    const savedComplaint = await newComplaint.save();

    return res.status(201).json({
      success: true,
      data: savedComplaint,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Duplicate Complaint ID already exists.",
      });
    }

    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});


// ======================================================
// GET COMPLAINT PDF
// User can access ONLY their own complaint
// Admin can access any complaint
// ======================================================

router.get("/:id/pdf", async (req, res) => {
  try {
    const complaint = await Complaint.findOne(
      getQueryFilter(req, {
        _id: req.params.id,
      })
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        error: "Complaint record not found",
      });
    }

    return res.send(
      `Generating PDF report for Complaint ID: ${complaint.complaintId}`
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


module.exports = router;