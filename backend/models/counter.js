const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  seq: { type: Number, default: 0 }
});

const Counter = mongoose.model("Counter", CounterSchema);

const getNextSequence = async (prefix, padLength = 3) => {
  const counter = await Counter.findOneAndUpdate(
    { id: prefix },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return `${prefix}-${String(counter.seq).padStart(padLength, "0")}`;
};

module.exports = { Counter, getNextSequence };