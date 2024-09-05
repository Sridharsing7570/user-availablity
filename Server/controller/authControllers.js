const User = require("../models/userModel");

// Simple login with session management
exports.login = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create a new user if they don't exist, with role 'user'
      user = new User({ email, role: "user" });
      await user.save();
    }

    // log the user in by setting the session or token
    req.session.userId = user._id;
    req.session.role = user.role;

    res
      .status(200)
      .json({ message: "Login successful", role: user.role, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// user logout
exports.logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "logout failed" });
    }
    res.status(200).json({ message: "Logout succesfull" });
  });
};

exports.adminSignUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email is already in use
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Create a new admin user
    user = new User({ email, password, role: "admin" });
    await user.save();

    // Optionally, log the admin in after signup
    req.session.userId = user._id;
    req.session.role = user.role;

    res.status(201).json({
      message: "Admin account created successfully",
      userId: user._id,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Admin login
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log("request body:", req.body);

  try {
    // Find the user
    const user = await User.findOne({ email });

    // Check if the user is an Admin
    if (!user || user.role !== "admin") {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    //Log the admin in
    req.session.userId = user._id;
    req.session.role = user.role;

    res.status(200).json({ message: "Admin login successful" });
  } catch (error) {
    console.error("error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
