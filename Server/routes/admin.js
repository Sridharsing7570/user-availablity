const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const authController = require("../controller/authControllers");
const sessionSchedullingController = require("../controller/sessionSchedullingController");
const isAdmin = require("../middlewares/adminMiddleware");

// Admin singup and login
router.post("/signup", authController.adminSignUp);
router.post("/login", authController.adminLogin);

//route to view user's availability
router.get(
  "/:userId/availability",
  isAdmin,
  adminController.viewUserAvailability
);
router.post(
  "/schedule-session",
  isAdmin,
  sessionSchedullingController.scheduleSession
);

module.exports = router;
