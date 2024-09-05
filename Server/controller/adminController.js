const Availability = require("../models/availabiltyModel");

const User = require("../models/userModel");

exports.viewUserAvailability = async (req, res) => {
  const { userId } = req.params;
  try {
    const availability = await Availability.find({ user: userId });
    if (!availability) {
      return res
        .status(404)
        .json({ error: "No availability found for this user" });
    }
    res.status(200).json(availability);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
