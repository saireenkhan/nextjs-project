const express = require("express");
const router = express.Router();
const Staff = require("../models/staff");
const PDFDocument = require("pdfkit");

// GET: Generate and download Staff PDF receipt
router.get("/:id/pdf", async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).send("Staff record not found for PDF");
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename=staff-${staff.staffId}.pdf`);

    const doc = new PDFDocument({ margin: 50 });
    doc.pipe(res);

    doc.fontSize(22).fillColor("#166534").text("Hisab-Ul-Khair", { align: "center" });
    doc.fontSize(12).fillColor("#555555").text("Staff Profile & Salary Report", { align: "center" });
    doc.moveDown(2);

    doc.fontSize(16).fillColor("#000000").text("Staff Details Summary", { underline: true });
    doc.moveDown(1);

    doc.fontSize(12).text(`Staff ID: ${staff.staffId}`);
    doc.text(`Full Name: ${staff.fullName}`);
    doc.text(`Father's Name: ${staff.fatherName || "N/A"}`);
    doc.text(`CNIC: ${staff.cnic || "N/A"}`);
    doc.text(`Phone: ${staff.phone || "N/A"}`);
    doc.text(`Designation: ${staff.designation}`);
    doc.text(`Current Monthly Salary: Rs. ${staff.currentMonthlySalary?.toLocaleString()}`);
    doc.text(`Ramadan Bonus: Rs. ${staff.ramadanBonus?.toLocaleString()}`);
    doc.text(`Status: ${staff.status}`);
    doc.text(`Joining Date: ${staff.joiningDate || "N/A"}`);

    doc.moveDown(4);
    doc.fontSize(10).fillColor("#888888").text("This is a system-generated electronic document.", { align: "center" });

    doc.end();
  } catch (error) {
    console.error("Error generating Staff PDF:", error);
    res.status(500).send("Server Error generating PDF");
  }
});

// GET all staff records
router.get("/", async (req, res) => {
  try {
    const staffList = await Staff.find().sort({ createdAt: -1 });
    res.json({ success: true, data: staffList });
  } catch (error) {
    console.error("Error fetching staff:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST create new staff record
router.post("/", async (req, res) => {
  try {
    const newStaff = new Staff(req.body);
    const savedStaff = await newStaff.save();
    res.status(201).json({ success: true, data: savedStaff });
  } catch (error) {
    console.error("Error saving staff:", error);
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;