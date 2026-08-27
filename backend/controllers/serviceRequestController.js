const ServiceRequest = require("../models/ServiceRequest");
const PDFDocument = require("pdfkit");

// Fetch all service requests
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create a new service request
exports.createRequest = async (req, res) => {
  try {
    const count = await ServiceRequest.countDocuments();
    const requestId = `SRQ-${1000 + count + 1}`;

    const newRequest = new ServiceRequest({
      requestId,
      ...req.body,
    });

    const savedRequest = await newRequest.save();
    res.status(201).json({ success: true, data: savedRequest });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Export individual service request receipt as PDF
exports.exportServiceRequestPDF = async (req, res) => {
  try {
    const request = await ServiceRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ success: false, error: "Service request not found" });
    }

    const doc = new PDFDocument({ margin: 50 });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=Service_Request_${request.requestId}.pdf`);
    doc.pipe(res);

    // PDF Header Design
    doc.fontSize(20).fillColor("#10b981").text("Masjid Management System", { align: "center" });
    doc.fontSize(12).fillColor("#555555").text("Official Service Request Receipt", { align: "center" });
    doc.moveDown(2);

    doc.fontSize(14).fillColor("#000000").text(`Request ID: ${request.requestId}`, { bold: true });
    doc.fontSize(10).text(`Generated On: ${new Date().toLocaleDateString()}`);
    doc.moveDown();

    // Details Block
    doc.rect(50, doc.y, 500, 110).stroke("#d1d5db");
    const startY = doc.y + 10;
    doc.text(`Request Type: ${request.requestType}`, 70, startY);
    doc.text(`Requester Name: ${request.requesterName}`, 70, startY + 20);
    doc.text(`Phone Number: ${request.phone}`, 70, startY + 40);
    doc.text(`Required Date: ${request.requiredDate}`, 70, startY + 60);
    doc.text(`Priority Level: ${request.priority}`, 70, startY + 80);

    doc.moveDown(4);
    doc.fontSize(12).text(`Current Status: ${request.status}`, { bold: true });
    
    if(request.description) {
      doc.moveDown();
      doc.fontSize(10).text(`Additional Notes / Description:`);
      doc.text(request.description, { width: 450 });
    }

    doc.end();
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};