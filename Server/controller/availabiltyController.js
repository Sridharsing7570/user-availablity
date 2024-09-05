const Availability = require("../models/availabiltyModel");

// Create or update availabilty
exports.setAvailibilty = async (req, res) => {
  const { start, end, duration, scheduleSlots } = req.body;
  console.log(req);
  console.log("body:", req.body);
  const userId = req.session.userId; // Get the user ID from session

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    let availabilty = await Availability.findOne({ user: userId, start, end });
    if (availabilty) {
      availabilty.duration = duration;
      availabilty.scheduleSlots = scheduleSlots;
      await availabilty.save();
    } else {
      availabilty = new Availability({
        user: userId,
        start,
        end,
        duration,
        scheduleSlots,
      });

      await availabilty.save();
    }
    res.status(200).json(availabilty);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAvailabilty = async (req, res) => {
  const userId = req.session.userId; // Get the user ID from session

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const availabilty = await Availability.find({ user: userId });
    res.status(200).json(availabilty);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
