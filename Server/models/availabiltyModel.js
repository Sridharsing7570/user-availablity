const mongoose = require("mongoose");

const scheduleSlotSchema = new mongoose.Schema({
  slotStart: {
    type: Date,
    required: true,
  },
  slotEnd: {
    type: Date,
    required: true,
  },
});

const availabiltySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  scheduleSlots: {
    type: [scheduleSlotSchema],
    default: [],
  },
});

const Availability = mongoose.model("Availability", availabiltySchema);

module.exports = Availability;
