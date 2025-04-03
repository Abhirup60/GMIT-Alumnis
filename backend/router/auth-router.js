const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller")

router.route("/").get(authController.home);

// to get all the alumni details
router.route("/alumni-users").get(authController.allAlumnis);

module.exports = router;