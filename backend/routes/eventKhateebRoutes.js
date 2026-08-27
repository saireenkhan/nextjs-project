const express = require("express");
const router = express.Router();
const EventKhateeb = require("../models/eventKhateeb");
const Event = require("../models/Event");
const PDFDocument = require("pdfkit");

// GET: Generate and download Event/Khateeb PDF receipt
router.get("/:id/pdf", async (req, res) => {
  try {
    const record = await EventKhateeb.findById(req.params.id);
    if (!record) {
      return res.status(404).send("Event/Khateeb record not found for PDF");
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename=event-khateeb-${record.eventId}.pdf`);

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res);

    doc.fontSize(22).fillColor("#166534").text("Hisab-Ul-Khair", { align: "center" });
    doc.fontSize(12).fillColor("#555555").text("Events, Khateeb & Qari Management Report", { align: "center" });
    doc.moveDown(2);

    doc.fontSize(16).fillColor("#000000").text("Assignment Summary Details", { underline: true });
    doc.moveDown(1);

    doc.fontSize(12).text(`Event ID: ${record.eventId}`);
    doc.text(`Event Type: ${record.eventType}`);
    doc.text(`Full Name (Person): ${record.fullName}`);
    doc.text(`Assigned Topic: ${record.assignedTopic || "N/A"}`);
    doc.text(`Hadia Fund: ${record.hadiaFund || "N/A"}`);
    doc.text(`Hadia Amount: Rs. ${record.hadiaAmount?.toLocaleString()}`);
    doc.text(`Payment Status: ${record.paymentStatus}`);
    doc.text(`Status: ${record.status}`);
    doc.text(`Event Date: ${record.eventDate || "N/A"}`);

    doc.moveDown(4);
    doc.fontSize(10).fillColor("#888888").text("This is a system-generated electronic document.", { align: "center" });

    doc.end();
  } catch (error) {
    console.error("Error generating Event PDF:", error);
    res.status(500).send("Server Error generating PDF");
  }
});

// GET all records
router.get("/", async (req, res) => {
  try {
    const list = await EventKhateeb.find().sort({ createdAt: -1 });
    res.json({ success: true, data: list });
  } catch (error) {
    console.error("Error fetching event/khateeb records:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST create new record
//
// ==========================================================
// BRIDGE TO MUQTADI'S "UPCOMING EVENTS"
// ==========================================================
// Whenever Admin creates an Event/Khateeb record here, a
// matching Event document is also created in the Event
// collection (the one backing /api/events, which Muqtadi's
// UpcomingEvents.jsx already reads via fetchEvents()).
//
// This is intentionally one-directional: Muqtadi creating an
// event via /api/events does NOT create anything here, and
// Muqtadi's fetch/create logic is completely untouched — it
// keeps working exactly as it already does. This route just
// additionally writes into that same collection.
//
// The bridge write is wrapped in its own try/catch so that a
// failure to sync into Upcoming Events (e.g. unexpected data)
// never blocks or fails the Admin's primary save.
// ==========================================================

router.post("/", async (req, res) => {
  try {
    const newRecord = new EventKhateeb(req.body);
    const savedRecord = await newRecord.save();

    try {
      const companionEvent = new Event({
        event: savedRecord.eventType || "Event",
        date: savedRecord.eventDate || "",
        time: savedRecord.eventTime || "",
        speaker: savedRecord.fullName || "TBA",
        topic: savedRecord.assignedTopic || "",
        status: savedRecord.status || "Confirmed",
        sourceEventKhateebId: savedRecord._id,
      });

      await companionEvent.save();

    } catch (bridgeError) {
      console.error(
        "Failed to sync Event/Khateeb into Upcoming Events:",
        bridgeError
      );
      // Intentionally not re-thrown — Admin's save above already
      // succeeded and should not be rolled back over this.
    }

    res.status(201).json({ success: true, data: savedRecord });
  } catch (error) {
    console.error("Error saving event/khateeb:", error);
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;