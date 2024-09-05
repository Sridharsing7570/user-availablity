const Availability = require("../models/availabiltyModel");
const Session = require("../models/sessionModel");
const sendEmailNotification = require("../utils/emailSender");
const sendSMSNotification = require("../utils/twilo");

exports.scheduleSession = async (req, res) => {
  const { userId, start, end, attendees, sessionType } = req.body;

  try {
    // Find user availability
    const availability = await Availability.findOne({
      user: userId,
      start: { $lte: new Date(start) },
      end: { $gte: new Date(end) },
    });

    if (!availability) {
      return res
        .status(400)
        .json({ error: "Selected time slot is not available for the user" });
    }

    // Check if the session ovelaps with existing sessions
    const conflictingSession = await Session.findOne({
      user: userId,
      $or: [
        { start: { $lt: new Date(end), $gte: new Date(start) } },
        { end: { $lte: new Date(end), $gt: new Date(start) } },
      ],
    });

    if (conflictingSession) {
      return res
        .status(400)
        .json({ error: "Time conflict with another session" });
    }

    //Schedule the session
    const session = new Session({
      user: userId,
      start: new Date(start),
      end: new Date(end),
      duration: (new Date(end) - new Date(start)) / 60000, // Durtion in mitutes
      attendees,
      sessionType,
    });

    await session.save();

    res.status(201).json({ message: "Session scheduled successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get upcoming sessions for a user
exports.getUserSessions = async (req, res) => {
  const userId = req.user._id;

  try {
    // Find sessions where the user is either the session creater or an attendee
    const sessions = await Session.find({
      $or: [
        { user: userId },
        { "attendees.email": req.user.email }, // Check if the user is an attendee
      ],
      start: { $gte: new Date() }, // Only upcoming sessions
    });

    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving sessions", error });
  }
};

// Update session or reschedule
exports.updateSession = async (req, res) => {
  const { sessionId } = req.params;
  const { newStart, newEnd } = req.body;

  try {
    const session = await Session.findById(sessionId);

    if (!session) return res.status(404).json({ message: "Session not found" });

    // Update the session's start and end times
    session.start = newStart;
    session.end = newEnd;
    await session.save();

    // Notify participants
    const sessionDeatils = { newStart, newEnd };
    session.attendees.forEach((attendee) => {
      if (attendee.notificationPreference === "email") {
        // Send an email(use Nodemail)
        sendEmailNotification(attendee, sessionDeatils);
      } else if (attendee.notificationPreference === "sms") {
        // send an sms (use Twilo)
        sendSMSNotification(attendee, sessionDeatils);
      }
    });

    res
      .status(200)
      .json({ message: "Session canceled and participants notified" });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling session", error });
  }
};

exports.setNotificationPreferences = async (req, res) => {
  const { preference } = req.body;

  try {
    req.user.notificationPreference = preference;
    await req.user.save();

    res.status(200).json({ message: "Notification preferences updated" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating notification preferences", error });
  }
};
