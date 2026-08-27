const express = require("express");
const router = express.Router();
const IslamicCalendar = require("../models/IslamicCalendar");

// Fetch all Islamic calendar events
router.get("/", async (req, res) => {
  try {
    const events = await IslamicCalendar.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create a new Islamic calendar event
router.post("/", async (req, res) => {
  try {
    const { event, hijriDate, gregorianDate, program, status } = req.body;

    if (!event || !hijriDate || !gregorianDate || !program) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const newEvent = new IslamicCalendar({
      event,
      hijriDate,
      gregorianDate,
      program,
      status: status || "Upcoming"
    });

    const savedEvent = await newEvent.save();
    res.status(201).json({ success: true, data: savedEvent });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PDF Export route placeholder
router.get("/:id/export", async (req, res) => {
  try {
    const eventItem = await IslamicCalendar.findById(req.params.id);
    if (!eventItem) {
      return res.status(404).json({ success: false, error: "Event record not found" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=islamic-event-${req.params.id}.pdf`);
    res.send(`PDF export stream for event: ${eventItem.event}`);
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error during PDF export" });
  }
});

module.exports = router;