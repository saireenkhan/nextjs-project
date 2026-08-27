// scripts/addPanelField.js
// Run: node scripts/addPanelField.js

const mongoose = require('mongoose');
const Donation = require('../models/Donation');

async function addPanelField() {
  try {
    await mongoose.connect('mongodb://localhost:27017/your-database-name');
    
    // Update all documents without a panel field
    const result = await Donation.updateMany(
      { panel: { $exists: false } },
      { $set: { panel: 'admin' } }
    );
    
    console.log(`Updated ${result.nModified} documents with panel field`);
    
    await mongoose.disconnect();
    
  } catch (error) {
    console.error('Migration failed:', error);
    await mongoose.disconnect();
  }
}

addPanelField();