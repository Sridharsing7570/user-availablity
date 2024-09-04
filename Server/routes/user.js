const express = require("express");
const router = express.Router();
const authController = require("../controller/authControllers");
const availabiltyControler = require("../controller/availabiltyController");

// route for login and logout
router.post("/login", authController.login);
router.post("/logout", authController.logout);

// route for availabilty
router.post("/availabilty", availabiltyControler.setAvailibilty);
router.get("/availabilty", availabiltyControler.getAvailabilty);

module.exports = router;
