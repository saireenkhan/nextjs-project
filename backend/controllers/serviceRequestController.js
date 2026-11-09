const ServiceRequest = require('../models/ServiceRequest');
const { getQueryFilter } = require('../utils/queryHelper');


// GET USER'S REQUESTS
exports.getAllRequests = async (req, res) => {
  try {

    const filter = getQueryFilter(req);

    const requests = await ServiceRequest.find(filter)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: requests
    });

  } catch (error) {

    console.error('Get service requests error:', error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};


// CREATE REQUEST
exports.createRequest = async (req, res) => {
  try {

    const newRequest = new ServiceRequest({
      ...req.body,

      // IMPORTANT:
      // Attach record to logged-in user
      user: req.user._id
    });

    const saved = await newRequest.save();

    res.status(201).json({
      success: true,
      data: saved
    });

  } catch (error) {

    console.error('Create service request error:', error);

    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};