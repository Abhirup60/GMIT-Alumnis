const JobForm = require("../models/jobForm-schema");

// Submit a job form
const jobForm = async (req, res) => {
  try {
    const { jobid, jobtitle, companyname, jobdesc, location, skills } = req.body;

    if (!jobid || !jobtitle || !companyname || !jobdesc || !location || !skills) {
      return res.status(400).json({ msg: "Please fill all the fields" });
    }

    const skillsArray = Array.isArray(skills) ? skills : skills.split(',').map(skill => skill.trim());

    const newPost = await JobForm.create({ 
      jobid, 
      jobtitle, 
      companyname, 
      jobdesc, 
      location, 
      skills: skillsArray 
    });

    return res.status(200).json({ msg: "Job Form Submitted Successfully", newPost });
  } catch (error) {
    console.error("Error submitting job form:", error);
    return res.status(500).json({ msg: "Job Form Not Submitted Successfully" });
  }
};

// Fetch all jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await JobForm.find();
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ msg: "Error fetching jobs" });
  }
};

module.exports = { jobForm, getJobs };