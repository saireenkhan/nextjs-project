const express = require("express");
const router = express.Router();
const QuranClass = require("../models/QuranClass");

// Helper function to format 24h time to 12h AM/PM format cleanly
const formatTimeTo12Hour = (timeStr) => {
  if (!timeStr || !timeStr.includes(":")) return timeStr;
  
  const parts = timeStr.split(":");
  let hours = parseInt(parts[0], 10);
  const minutes = parts[1] ? parts[1].slice(0, 2) : "00";
  
  if (isNaN(hours)) return timeStr;

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedHours = hours < 10 ? "0" + hours : hours;

  return `${formattedHours}:${minutes} ${ampm}`;
};

// Fetch all Quran classes
router.get("/", async (req, res) => {
  try {
    const classes = await QuranClass.find().sort({ createdAt: -1 });
    // Combine timeFrom and timeTo into a unified timing string for display if needed
    const formattedClasses = classes.map(item => ({
      ...item._doc,
      timing: `${formatTimeTo12Hour(item.timeFrom)} - ${formatTimeTo12Hour(item.timeTo)}`
    }));
    res.json(formattedClasses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new Quran class
router.post("/", async (req, res) => {
  try {
    const { className, teacher, timeFrom, timeTo, ageGroup, status } = req.body;

    if (!className || !teacher || !timeFrom || !timeTo) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const newClass = new QuranClass({
      className,
      teacher,
      timeFrom,
      timeTo,
      ageGroup,
      status: status || "Open"
    });

    const savedClass = await newClass.save();
    res.status(201).json({ success: true, data: savedClass });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Export a single Quran class PDF route placeholder
router.get("/:id/export", async (req, res) => {
  try {
    const classItem = await QuranClass.findById(req.params.id);
    if (!classItem) {
      return res.status(404).send("Class record not found");
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=class-${req.params.id}.pdf`);
    res.send(`PDF export stream for class: ${classItem.className}`);
  } catch (error) {
    res.status(500).send("Server error during PDF export");
  }
});

module.exports = router;