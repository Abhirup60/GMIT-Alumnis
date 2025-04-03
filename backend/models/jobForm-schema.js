const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobid: {
    type: String,
    required: true,
  },
  jobtitle: {
    type: String,
    required: true,
  },
  companyname: {
    type: String,
    required: true,
  },
  jobdesc: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  skills: {
    type: [String], 
    required: true,
  }
});

const JobForm = mongoose.model("JOBFORM", jobSchema);
module.exports = JobForm;