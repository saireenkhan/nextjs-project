const express = require("express");
const router = express.Router();

const EventKhateeb = require("../models/eventKhateeb");
const Event = require("../models/Event");
const PDFDocument = require("pdfkit");

const { authenticate } = require("../middleware/auth");
const { getQueryFilter } = require("../utils/queryHelper");

// ======================================================
// AUTHENTICATION
// ======================================================

router.use(authenticate);


// ======================================================
// GET ALL EVENT-KHATEEB RECORDS
//
// Admin  -> sees ALL users' records
// Others -> sees ONLY their own records
// ======================================================

router.get("/", async (req, res) => {
  try {
    const filter = getQueryFilter(req);

    const list = await EventKhateeb.find(filter)
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: list,
    });
  } catch (error) {
    console.error("Error fetching Event-Khateeb records:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// ======================================================
// GET SINGLE EVENT-KHATEEB RECORD
//
// Admin  -> can access any record
// Others -> can access only their own record
// ======================================================

router.get("/:id", async (req, res) => {
  try {
    const record = await EventKhateeb.findOne(
      getQueryFilter(req, {
        _id: req.params.id,
      })
    );

    if (!record) {
      return res.status(404).json({
        success: false,
        error: "Event-Khateeb record not found.",
      });
    }

    return res.json({
      success: true,
      data: record,
    });
  } catch (error) {
    console.error("Error fetching Event-Khateeb record:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// ======================================================
// CREATE EVENT-KHATEEB
//
// Owner is ALWAYS taken from logged-in user.
// Frontend cannot assign another user.
//
// Also creates a companion Event record.
// ======================================================

router.post("/", async (req, res) => {
  try {
    // --------------------------------------------------
    // Create Event-Khateeb record
    // --------------------------------------------------

    const newRecord = new EventKhateeb({
      ...req.body,

      // Backend-controlled owner
      user: req.user._id,
    });

    const savedRecord = await newRecord.save();


    // --------------------------------------------------
    // Create companion Event
    // --------------------------------------------------

    try {
      const companionEvent = new Event({
        event: savedRecord.eventType || "Event",

        date: savedRecord.eventDate || "",

        time: savedRecord.eventTime || "",

        speaker: savedRecord.fullName || "TBA",

        topic: savedRecord.assignedTopic || "",

        status: savedRecord.status || "Confirmed",

        sourceEventKhateebId: savedRecord._id,

        // IMPORTANT:
        // The companion Event must belong
        // to the same user.
        user: req.user._id,
      });

      await companionEvent.save();
    } catch (bridgeError) {
      console.error(
        "Error creating companion Event:",
        bridgeError
      );

      // We don't fail the Event-Khateeb creation
      // if the companion Event fails.
    }


    return res.status(201).json({
      success: true,
      data: savedRecord,
    });
  } catch (error) {
    console.error(
      "Error creating Event-Khateeb record:",
      error
    );

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Duplicate record already exists.",
      });
    }

    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});


// ======================================================
// UPDATE EVENT-KHATEEB
//
// Admin  -> can update any record
// Others -> can update only their own record
//
// Owner cannot be changed from frontend.
// ======================================================

router.put("/:id", async (req, res) => {
  try {
    const filter = getQueryFilter(req, {
      _id: req.params.id,
    });

    // Don't allow frontend to change ownership
    const updateData = {
      ...req.body,
    };

    delete updateData.user;
    delete updateData._id;

    const updatedRecord = await EventKhateeb.findOneAndUpdate(
      filter,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedRecord) {
      return res.status(404).json({
        success: false,
        error: "Event-Khateeb record not found.",
      });
    }

    return res.json({
      success: true,
      data: updatedRecord,
    });
  } catch (error) {
    console.error(
      "Error updating Event-Khateeb record:",
      error
    );

    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});


// ======================================================
// DELETE EVENT-KHATEEB
//
// Admin  -> can delete any record
// Others -> can delete only their own record
// ======================================================

router.delete("/:id", async (req, res) => {
  try {
    const filter = getQueryFilter(req, {
      _id: req.params.id,
    });

    const deletedRecord =
      await EventKhateeb.findOneAndDelete(filter);

    if (!deletedRecord) {
      return res.status(404).json({
        success: false,
        error: "Event-Khateeb record not found.",
      });
    }

    // --------------------------------------------------
    // Delete companion Event if it exists
    // --------------------------------------------------

    try {
      await Event.deleteOne({
        sourceEventKhateebId: deletedRecord._id,
      });
    } catch (bridgeError) {
      console.error(
        "Error deleting companion Event:",
        bridgeError
      );
    }

    return res.json({
      success: true,
      message: "Event-Khateeb record deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Error deleting Event-Khateeb record:",
      error
    );

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// ======================================================
// GENERATE EVENT-KHATEEB PDF
//
// IMPORTANT:
// This route comes before any generic /:id route.
//
// Admin  -> can download any user's PDF
// Others -> can download ONLY their own PDF
// ======================================================

router.get("/:id/pdf", async (req, res) => {
  try {
    const record = await EventKhateeb.findOne(
      getQueryFilter(req, {
        _id: req.params.id,
      })
    );

    if (!record) {
      return res.status(404).json({
        success: false,
        error: "Event-Khateeb record not found.",
      });
    }


    // --------------------------------------------------
    // PDF headers
    // --------------------------------------------------

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `inline; filename=event-khateeb-${record._id}.pdf`
    );


    // --------------------------------------------------
    // Create PDF
    // --------------------------------------------------

    const doc = new PDFDocument({
      margin: 50,
    });

    doc.pipe(res);


    // --------------------------------------------------
    // Header
    // --------------------------------------------------

    doc
      .fontSize(22)
      .fillColor("#166534")
      .text("Hisab-Ul-Khair", {
        align: "center",
      });

    doc
      .fontSize(12)
      .fillColor("#555555")
      .text("Event & Khateeb Report", {
        align: "center",
      });

    doc.moveDown(2);


    // --------------------------------------------------
    // Details heading
    // --------------------------------------------------

    doc
      .fontSize(16)
      .fillColor("#000000")
      .text("Event-Khateeb Details", {
        underline: true,
      });

    doc.moveDown(1);

    doc.fontSize(12);


    // --------------------------------------------------
    // Details
    // --------------------------------------------------

    if (record.eventType) {
      doc.text(`Event Type: ${record.eventType}`);
    }

    if (record.eventDate) {
      doc.text(`Event Date: ${record.eventDate}`);
    }

    if (record.eventTime) {
      doc.text(`Event Time: ${record.eventTime}`);
    }

    if (record.fullName) {
      doc.text(`Khateeb Name: ${record.fullName}`);
    }

    if (record.assignedTopic) {
      doc.text(`Assigned Topic: ${record.assignedTopic}`);
    }

    if (record.status) {
      doc.text(`Status: ${record.status}`);
    }


    // --------------------------------------------------
    // Additional fields if available
    // --------------------------------------------------

    if (record.phone) {
      doc.text(`Phone: ${record.phone}`);
    }

    if (record.email) {
      doc.text(`Email: ${record.email}`);
    }

    if (record.description) {
      doc.moveDown(1);

      doc.text("Description:");

      doc.moveDown(0.5);

      doc.text(record.description);
    }


    // --------------------------------------------------
    // Footer
    // --------------------------------------------------

    doc.moveDown(4);

    doc
      .fontSize(10)
      .fillColor("#888888")
      .text(
        "This is a system-generated electronic document.",
        {
          align: "center",
        }
      );


    // --------------------------------------------------
    // Finish PDF
    // --------------------------------------------------

    doc.end();

  } catch (error) {
    console.error(
      "Error generating Event-Khateeb PDF:",
      error
    );

    return res.status(500).json({
      success: false,
      error: "Server Error generating Event-Khateeb PDF",
    });
  }
});


module.exports = router;