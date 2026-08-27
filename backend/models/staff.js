const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema(
  {
    staffId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    fatherName: { type: String },
    cnic: { type: String },
    phone: { type: String },
    email: { type: String },
    address: { type: String },
    designation: { type: String, required: true },
    education: { type: String },
    experience: { type: String },
    joiningDate: { type: String },
    currentMonthlySalary: { type: Number, required: true, default: 0 },
    previousSalary: { type: Number, default: 0 },
    salaryIncreaseAmount: { type: Number, default: 0 },
    salaryIncreaseDate: { type: String },
    increaseReason: { type: String },
    ramadanBonus: { type: Number, default: 0 },
    bonusMonth: { type: String },
    status: { type: String, required: true, default: "Verified" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Staff", StaffSchema);