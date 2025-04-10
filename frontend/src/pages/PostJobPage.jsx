import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../stores/Auth";
import Select from "react-select";
import { useNavigate } from "react-router-dom";


const PostJobPage = () => {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const { alumniStudent } = useAuth();
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    jobid: "",
    jobtitle: "",
    companyname: "",
    jobdesc: "",
    location: "",
    skills: []
  });

  // Update details.skills whenever selectedSkills changes
  useEffect(() => {
    setDetails(prev => ({
      ...prev,
      skills: selectedSkills.map(skill => skill.value)
    }));
  }, [selectedSkills]);

  const skillsList = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "React", label: "React" },
    { value: "Node.js", label: "Node.js" },
    { value: "Python", label: "Python" },
    { value: "Java", label: "Java" },
    { value: "SQL", label: "SQL" },
    { value: "HTML/CSS", label: "HTML/CSS" },
    { value: "AWS", label: "AWS" },
    { value: "Machine Learning", label: "Machine Learning" },
    { value: "Data Analysis", label: "Data Analysis" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!details.jobid || !details.jobtitle || !details.companyname || 
        !details.jobdesc || !details.location || details.skills.length === 0) {
      toast.error("Please fill all the fields");
      return;
    }

    const alumniExists = alumniStudent.some(
      (alumni) => alumni.registrationNumber === registrationNumber
    );

    if (!alumniExists) {
      toast.error("Only registered alumni can post jobs.");
      return;
    }

    try {
      const response = await fetch("https://gmit-alumnis-backend.onrender.com/job/jobform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Job posted successfully!");
        navigate("/job-board");
        setDetails("");
        setSelectedSkills([]);
        setRegistrationNumber("");
      } else {
        toast.error(data.msg || "Failed to post job. Please try again.");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className='min-h-screen bg-[#f8f9fa] p-6'>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-[#1a2a5e] mb-2'>Post a Job Vacancy</h1>
          <p className='text-lg text-gray-600'>Share job opportunities with the community.</p>
        </div>

        <div className='bg-white shadow-lg rounded-lg p-6'>
          <form className='space-y-4' onSubmit={handleSubmit}>
            {/* Job ID Field */}
            <div>
              <label className='block text-sm font-medium text-gray-700'>Job ID</label>
              <input
                type='text'
                name="jobid"
                value={details.jobid}
                onChange={handleChange}
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none 
                focus:ring-2 focus:ring-[#1a2a5e]'
                placeholder='Enter job ID'
                required
              />
            </div>

            {/* Job Title Field */}
            <div>
              <label className='block text-sm font-medium text-gray-700'>Job Title</label>
              <input
                type='text'
                name="jobtitle"
                value={details.jobtitle}
                onChange={handleChange}
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none
                 focus:ring-2 focus:ring-[#1a2a5e]'
                placeholder='Enter job title'
                required
              />
            </div>

            {/* Company Name Field */}
            <div>
              <label className='block text-sm font-medium text-gray-700'>Company Name</label>
              <input
                type='text'
                name="companyname"
                value={details.companyname}
                onChange={handleChange}
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none 
                focus:ring-2 focus:ring-[#1a2a5e]'
                placeholder='Enter company name'
                required
              />
            </div>

            {/* Job Description Field */}
            <div>
              <label className='block text-sm font-medium text-gray-700'>Job Description</label>
              <textarea
                value={details.jobdesc}
                onChange={handleChange}
                name="jobdesc"
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none
                 focus:ring-2 focus:ring-[#1a2a5e]'
                placeholder='Enter job description'
                rows='4'
                required
              />
            </div>

            {/* Location Field */}
            <div>
              <label className='block text-sm font-medium text-gray-700'>Location</label>
              <input
                type='text'
                name="location"
                value={details.location}
                onChange={handleChange}
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none
                 focus:ring-2 focus:ring-[#1a2a5e]'
                placeholder='Enter job location'
                required
              />
            </div>

            {/* Skills Dropdown */}
            <div>
              <label className='block text-sm font-medium text-gray-700'>Skills Required</label>
              <Select
                isMulti
                options={skillsList}
                value={selectedSkills}
                onChange={setSelectedSkills}
                placeholder='Select skills...'
                className='react-select-container'
                classNamePrefix='react-select'
                isSearchable
                required
              />
            </div>

            {/* Alumni Registration Number Field */}
            <div>
              <label className='block text-sm font-medium text-gray-700'>Alumni Registration Number</label>
              <input
                type='text'
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none 
                focus:ring-2 focus:ring-[#1a2a5e]'
                placeholder='Enter alumni registration number'
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full bg-[#f36f21] text-white px-6 py-3 rounded-lg 
              hover:bg-[#e65a1a] transition font-semibold'
            >
              Post Job
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJobPage;
