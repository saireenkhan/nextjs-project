const express = require("express");
const router = express.Router();

const Event = require("../models/Event");
const { authenticate } = require("../middleware/auth");
const { getQueryFilter } = require("../utils/queryHelper");

router.use(authenticate);

// GET: Fetch events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find(
      getQueryFilter(req)
    ).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: events,
    });
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// GET: Fetch single event
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findOne(
      getQueryFilter(req, { _id: req.params.id })
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        error: "Event not found.",
      });
    }

    res.json({
      success: true,
      data: event,
    });
  } catch (err) {
    console.error("Error fetching event:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// POST: Create event
router.post("/", async (req, res) => {
  try {
    const newEvent = new Event({
      ...req.body,

      // Always assign ownership from authenticated user
      user: req.user._id,
    });

    const savedEvent = await newEvent.save();

    res.status(201).json({
      success: true,
      data: savedEvent,
    });
  } catch (err) {
    console.error("Error creating event:", err);

    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
});

// PUT: Update event
router.put("/:id", async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };

    // Non-admin users cannot transfer ownership
    if (req.user.role !== "Admin") {
      updateData.user = req.user._id;
    }

    const updatedEvent = await Event.findOneAndUpdate(
      getQueryFilter(req, { _id: req.params.id }),
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        error: "Event not found.",
      });
    }

    res.json({
      success: true,
      data: updatedEvent,
    });
  } catch (err) {
    console.error("Error updating event:", err);

    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
});

// DELETE: Delete event
router.delete("/:id", async (req, res) => {
  try {
    const deletedEvent = await Event.findOneAndDelete(
      getQueryFilter(req, { _id: req.params.id })
    );

    if (!deletedEvent) {
      return res.status(404).json({
        success: false,
        error: "Event not found.",
      });
    }

    res.json({
      success: true,
      message: "Event deleted successfully.",
      data: deletedEvent,
    });
  } catch (err) {
    console.error("Error deleting event:", err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;