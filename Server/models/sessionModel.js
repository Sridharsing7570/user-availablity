const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
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
  attendees: [
    {
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
  ],
  sessionType: {
    type: String,
    enum: ["one-on-one", "multi-participant"],
    default: "one-on-one",
  },
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
