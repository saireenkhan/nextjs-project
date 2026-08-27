const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hisab-ul-khair';

async function createAdminDirect() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const adminPermissions = {
      canAdd: true,
      canEdit: true,
      canDelete: true,
      canView: true,
      canManageUsers: true,
      canManageRoles: true,
      canAccessAllPanels: true,
      canManageFinance: true,
      canManageDonations: true,
      canManageExpenses: true,
      canApproveRequests: true,
      canGenerateReports: true,
      canExportData: true,
      canManageSettings: true,
      canSendNotifications: true,
      canManageEvents: true,
      canManagePrayers: true
    };

    const db = mongoose.connection.db;
    const collection = db.collection('userroles');

    const existingAdmin = await collection.findOne({ username: 'admin@masjid.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Email: admin@masjid.com');
      console.log('Password: admin123');
      await mongoose.connection.close();
      return;
    }

    const adminUser = {
      userId: 'USR-001',
      fullName: 'System Administrator',
      username: 'admin@masjid.com',
      password: hashedPassword,
      role: 'Admin',
      permissions: adminPermissions,
      twoFactor: 'Disabled',
      status: 'Active',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await collection.insertOne(adminUser);
    
    console.log('Admin user created successfully!');
    console.log('-----------------------------------');
    console.log('Email: admin@masjid.com');
    console.log('Password: admin123');
    console.log('Role: Admin');
    console.log('IMPORTANT: Change password after first login!');
    console.log('-----------------------------------');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

createAdminDirect();