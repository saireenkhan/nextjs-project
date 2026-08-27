const PDFDocument = require('pdfkit');

const generateDonationPDF = (donation, res) => {
  const doc = new PDFDocument({ margin: 50 });

  // Set response headers to force file download in browser
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=receipt-${donation._id}.pdf`);

  // Pipe the document directly to the HTTP response stream
  doc.pipe(res);

  // PDF Design Layout
  doc.fontSize(22).fillColor('#166534').text('HISAB-UL-KHAIR', { align: 'center' });
  doc.fontSize(12).fillColor('#555555').text('Official Donation Receipt', { align: 'center' });
  doc.moveDown(2);

  doc.fontSize(14).fillColor('#000000').text(`Receipt ID: ${donation._id}`);
  doc.text(`Donor Name: ${donation.donorName}`);
  doc.text(`Donation Type: ${donation.donationType}`);
  doc.text(`Fund Category: ${donation.fundCategory}`);
  doc.text(`Amount: $${donation.amount}`);
  doc.text(`Status: ${donation.status}`);
  doc.text(`Date: ${new Date(donation.createdAt).toLocaleDateString()}`);

  doc.moveDown(4);
  doc.fontSize(10).fillColor('#777777').text('Thank you for your generous contribution!', { align: 'center' });

  // Finalize the PDF file
  doc.end();
};

module.exports = { generateDonationPDF };