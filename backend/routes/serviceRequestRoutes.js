const express = require("express");
const router = express.Router();
const {
  getAllRequests,
  createRequest,
  exportServiceRequestPDF,
} = require("../controllers/serviceRequestController");

router.get("/", getAllRequests);
router.post("/", createRequest);
router.get("/:id/export", exportServiceRequestPDF);

module.exports = router;