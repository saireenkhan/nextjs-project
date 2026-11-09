const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize Express
const app = express();

// Setup Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import Routes
const authRoutes = require('./routes/auth');
const quranClassesRoute = require("./routes/quranClasses");
const donationRoutes = require('./routes/donationRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const fundRoutes = require("./routes/fundRoutes");
const staffRoutes = require("./routes/staffRoutes");
const eventKhateebRoutes = require("./routes/eventKhateebRoutes");
const bankCashRoutes = require("./routes/bankCashRoutes");
const reports = require("./routes/reports");
const voterRoutes = require('./routes/voterRoutes');
const electionRoutes = require('./routes/electionRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const userRoleRoutes = require('./routes/userRoleRoutes');
const auditRoutes = require('./routes/auditRoutes');
const assignedTopicRoutes = require('./routes/assignedTopicRoutes');
const voteRoutes = require('./routes/voteRoutes');
const eventsRouter = require('./routes/events');
const islamicCalendarRoute = require("./routes/islamicCalendar");
const serviceRequestRoutes = require("./routes/serviceRequestRoutes");

// Public Routes (No authentication required)
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Protected Routes (No middleware for now, just register them)
app.use("/api/quran-classes", quranClassesRoute);
app.use('/api/donations', donationRoutes);
app.use('/api/expenses', expenseRoutes);
app.use("/api/funds", fundRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/events-khateeb", eventKhateebRoutes);
app.use("/api/bank-cash", bankCashRoutes);
app.use("/api/reports", reports);
app.use('/api/voters', voterRoutes);
app.use('/api/elections', electionRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/users-roles', userRoleRoutes);
app.use('/api/audits', auditRoutes);
app.use('/api/assigned-topics', assignedTopicRoutes);
app.use('/api/votes', voteRoutes);
app.use('/api/events', eventsRouter);
app.use("/api/islamic-calendar", islamicCalendarRoute);
app.use("/api/service-requests", serviceRequestRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Hisab-Ul-Khair Backend API is running...');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Server Error'
  });
});

// Environment configuration
const PORT = process.env.PORT || 5002;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hisab-ul-khair';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});