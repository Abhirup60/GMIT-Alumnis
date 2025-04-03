const express = require("express");
const router = express.Router();
const jobformController = require("../controllers/jobform-controller");

// Route to handle job form submission and fetching jobs
router.route("/jobform")
  .get(jobformController.getJobs) // Fetch all jobs
  .post(jobformController.jobForm); // Submit a job form

module.exports = router;